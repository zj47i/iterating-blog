import z from "zod";

export const OutputSchema = z.object({
    signatureMessage: z.string(),
});
export type Output = z.infer<typeof OutputSchema>;
