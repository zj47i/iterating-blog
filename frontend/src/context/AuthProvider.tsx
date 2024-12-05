import { useWallet } from "@solana/wallet-adapter-react";
import React, { createContext, useContext, useEffect } from "react";
import { getSignInData } from "../api/get-sign-in-input";
import { postVerifySignInOutput } from "../api/post-verify-sign-in-output";
import { postAuthentication } from "../api/post-authentication";
import { getSignatureMessage } from "../api/get-authentication-message";
import { WalletReadyState } from "@solana/wallet-adapter-base";

interface AuthContextType {
    authenticate: () => Promise<string | void>;
}

// 1. AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. AuthProvider 컴포넌트 정의
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { signIn, signMessage, publicKey, wallets, select, connect } =
        useWallet();

    useEffect(() => {
        const wallet = wallets.find(
            (w) =>
                w.readyState === WalletReadyState.Installed ||
                w.readyState === WalletReadyState.Loadable
        );
        if (!wallet) {
            console.error("Any wallets not installed");
            return () => {}; // Return an empty function instead of null
        }
        select(wallet.adapter.name);
    }, []);

    const authenticate = async () => {
        try {
            await connect();
        } catch (error) {
            console.error("Failed to connect the wallet:", error);
            return;
        }
        let token;
        if (signIn) {
            const { signInInput } = await getSignInData();
            const signInOutput = await signIn(signInInput);
            const { idToken } = await postVerifySignInOutput({
                signInInput,
                signInOutput: {
                    account: {
                        address: "asd",
                        chains: signInOutput.account.chains,
                        features: signInOutput.account.features,
                        // 왜인지 모르겠는데 uint8array가 json 으로 변환될 때 buffer로 인식되지 않아서 직접 바꿔줌
                        publicKey: Buffer.from(signInOutput.account.publicKey),
                        icon: signInOutput.account.icon,
                        label: signInOutput.account.label,
                    },
                    signature: signInOutput.signature,
                    signedMessage: signInOutput.signedMessage,
                },
            });
            token = idToken;
        } else {
            if (!publicKey) {
                console.error("publicKey is not found");
                return;
            }
            if (!signMessage) {
                console.error("signMessage is not found");
                return;
            }

            const { signatureMessage } = await getSignatureMessage();
            const signature = await signMessage(Buffer.from(signatureMessage));
            const { idToken } = await postAuthentication({
                publicKey: publicKey.toBuffer().toString("base64"),
                signatureMessage: Buffer.from(signatureMessage).toString("base64"),
                signature: Buffer.from(signature).toString("base64"),
            });
            token = idToken;
        }

        return token;
    };

    return (
        <AuthContext.Provider value={{ authenticate }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. 외부에서 사용할 수 있도록 useAuth hook 생성
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
