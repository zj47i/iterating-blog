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
import { AuthProvider } from "../shared/context/AuthProvider";
import AppHeader from "../components/layout/AppHeader/AppHeader";
import AppContainer from "../components/layout/AppContainer/AppContainer";
import AppFooter from "../components/layout/AppFooter/AppFooter";

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
