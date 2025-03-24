import { BrowserRouter } from "react-router-dom";
import Layout from "./component/Layout";
import { useMemo } from "react";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import {
    PhantomWalletAdapter,
    CloverWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { AuthProvider } from "./context/AuthProvider";
import AppHeader from "./component/AppHeader/AppHeader";
import AppContainer from "./component/AppContainer/AppContainer";
import AppFooter from "./component/AppFooter/AppFooter";

function App() {
    const network = WalletAdapterNetwork.Mainnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [new CloverWalletAdapter(), new PhantomWalletAdapter()],
        [network]
    );

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
