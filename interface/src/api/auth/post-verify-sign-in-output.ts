import {
    SolanaSignInInput,
    SolanaSignInOutput,
} from "@solana/wallet-standard-features";

export type Input = {
    signInInput: SolanaSignInInput;
    signInOutput: SolanaSignInOutput;
};

export type Output = {
    idToken: string;
};
