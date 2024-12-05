import nacl from 'tweetnacl';
import { PostVerifySignature } from '@blog/interface';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Keypair } from '@solana/web3.js';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AuthProvider } from '../provider/auth-provider';
import { verifyMessageSignature } from '@solana/wallet-standard-util';

// 모듈들을 Mock 처리합니다.
describe('Address Decorator', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return encoded public key when headers are valid', () => {
    const authProvider = app.get<AuthProvider>(AuthProvider);
    const keypair = Keypair.generate();

    const publicKey = keypair.publicKey.toBuffer();
    const signatureMessage = Buffer.from(authProvider.createSignatureMessage());
    const signature = Buffer.from(
      nacl.sign.detached(signatureMessage, keypair.secretKey),
    );

    const result = nacl.sign.detached.verify(
      signatureMessage,
      signature,
      publicKey,
    );

    expect(result).toBe(true);
  });
});
