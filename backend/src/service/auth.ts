import { Injectable } from '@nestjs/common';
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from '@solana/wallet-standard-features';
import { AuthProvider } from '../provider/auth-provider';
import { PrismaProvider } from '../provider/prisma';
import { verifySignIn } from '@solana/wallet-standard-util';
import bs58 from 'bs58';

@Injectable()
export class AuthService {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly prisma: PrismaProvider,
  ) {}
  getSignInInput() {
    return {
      signInInput: this.authProvider.createSignInData(),
    };
  }
  verifySignature(input: {
    publicKey: string;
    signatureMessage: string;
    signature: string;
  }) {
    const address = this.authProvider.verifySignature(input);

    return {
      idToken: this.authProvider.createIdToken(address),
    };
  }
  getSignatureMessage() {
    return {
      signatureMessage: this.authProvider.createSignatureMessage(),
    };
  }

  verifySignInOutput(input: SolanaSignInInput, output: SolanaSignInOutput) {
    // utin8array를 json으로 바꾸면 buffer로 인식되고 buffer object 형태로 넘어온다.
    const verified = verifySignIn(input, {
      account: {
        ...output.account,
        publicKey: new Uint8Array(Buffer.from(output.account.publicKey)),
      },
      signature: new Uint8Array(Buffer.from(output.signature)),
      signedMessage: new Uint8Array(Buffer.from(output.signedMessage)),
    });

    if (!verified) {
      throw new Error('Invalid signature');
    }

    const idToken = this.authProvider.createIdToken(
      bs58.encode(new Uint8Array(Buffer.from(output.account.publicKey))),
    );

    return {
      idToken,
    };
  }
}
