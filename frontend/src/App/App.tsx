import { BrowserRouter } from "react-router-dom";
import { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { AuthProvider } from "../context/AuthProvider";
import AppHeader from "./AppHeader/AppHeader";
import AppContainer from "./AppContainer/AppContainer";
import AppFooter from "./AppFooter/AppFooter";

function App() {
    const network = WalletAdapterNetwork.Mainnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [], [network]);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <AppHeader />
                            <AppContainer />
                            <AppFooter />
                        </BrowserRouter>
                    </AuthProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
