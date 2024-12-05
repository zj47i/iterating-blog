import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  GetSignatureMessage,
  GetSignInInput,
  PostVerifySignature,
  PostVerifySignInOutput,
} from '@blog/interface';
import { AuthService } from '../service/auth';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // message
  @Get('/authentication/signature-message')
  getSignatureMessage(): GetSignatureMessage.Output {
    return this.authService.getSignatureMessage();
  }

  @Post('/authentication/verify-signature')
  async verifySignature(
    @Body() input: PostVerifySignature.Input,
  ): Promise<PostVerifySignature.Output> {
    return this.authService.verifySignature(input);
  }

  // sign-in
  @Get('/authentication/sign-in-input')
  getSignInInput(): GetSignInInput.Output {
    return this.authService.getSignInInput();
  }

  @Post('/authentication/verify-sign-in-output')
  verifySignInOutput(
    @Body() body: PostVerifySignInOutput.Input,
  ): PostVerifySignInOutput.Output {
    return this.authService.verifySignInOutput(
      body.signInInput,
      body.signInOutput,
    );
  }
}
