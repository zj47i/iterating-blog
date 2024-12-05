import z from 'zod';

export const TokenPayloadSchema = z.object({
  sub: z.number(),
  exp: z.number(),
});

export type AccessTokenPayload = z.infer<typeof TokenPayloadSchema>;

export const IdTokenPayloadSchema = z.object({
  sub: z.string(),
  exp: z.number(),
});

export type IdTokenPayload = z.infer<typeof IdTokenPayloadSchema>;
