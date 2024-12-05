import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../env';
import { IdTokenPayloadSchema } from '../../type/token-payload';

export const Address = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new Error('Authentication failed - invalid headers');
    }
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);

    const { sub } = IdTokenPayloadSchema.parse(payload);

    return sub;
  },
);
