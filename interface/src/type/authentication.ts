import z from "zod";

export const AuthenticationSchema = z.object({
    message: z.string(),
    publicKey: z.array(z.number()),
    sign: z.array(z.number()),
});

export type Authentication = z.infer<typeof AuthenticationSchema>;
