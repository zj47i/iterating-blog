import { Injectable } from '@nestjs/common';
import { SolanaSignInInput } from '@solana/wallet-standard-features';
import dayjs from 'dayjs';
import { AccessTokenPayload, IdTokenPayload } from '../type/token-payload';
import { v4 } from 'uuid';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../env';

@Injectable()
export class AuthProvider {
  createSignatureMessage(): string {
    return jwt.sign({ exp: dayjs().add(10, 'seconds').unix() }, JWT_SECRET);
  }

  createSignInData() {
    const signInInput: SolanaSignInInput = {
      statement:
        'Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.',
      version: '1',
      nonce: v4().substring(0, 8),
      issuedAt: new Date().toISOString(),
      expirationTime: dayjs().add(10, 'seconds').toISOString(),
    };

    return signInInput;
  }

  verifySignatureMessage(message: string): boolean {
    try {
      jwt.sign(message, JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  }

  verifySignature(input: {
    publicKey: string;
    signatureMessage: string;
    signature: string;
  }) {
    const { publicKey, signature, signatureMessage } = input;

    if (
      !jwt.verify(
        Buffer.from(signatureMessage, 'base64').toString(),
        JWT_SECRET,
      )
    ) {
      throw new Error('Authentication failed - invalid signature message');
    }

    if (
      !nacl.sign.detached.verify(
        Buffer.from(signatureMessage, 'base64'),
        Buffer.from(signature, 'base64'),
        Buffer.from(publicKey, 'base64'),
      )
    ) {
      throw new Error('Authentication failed - invalid signature');
    }

    return bs58.encode(Buffer.from(publicKey, 'base64'));
  }

  createIdToken(sub: string) {
    const tokenPayload: IdTokenPayload = {
      sub,
      exp: dayjs().add(10, 'seconds').unix(),
    };
    return jwt.sign(tokenPayload, JWT_SECRET);
  }

  createAccessToken(sub: number) {
    const tokenPayload: AccessTokenPayload = {
      sub,
      exp: dayjs().add(10, 'seconds').unix(),
    };
    return jwt.sign(tokenPayload, JWT_SECRET);
  }

  createRefreshToken() {
    const refreshToken = jwt.sign(
      { exp: dayjs().add(1, 'day').unix() },
      JWT_SECRET,
    );
    const refreshTokenExpiresAt = dayjs().add(1, 'week').toDate();
    return { refreshToken, refreshTokenExpiresAt };
  }
}
