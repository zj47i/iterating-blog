import { DraftSchema } from "../../type/draft.js";
import z from "zod";

export const HeadersScheme = z.object({
    authorization: z.string(),
});

export type Headers = z.infer<typeof HeadersScheme>;

export const InputSchema = z.object({
    title: z.string(),
    content: z.string(),
});
export type Input = z.infer<typeof InputSchema>;

export const OutputSchema = z.object({
    draft: DraftSchema,
});

export type Output = z.infer<typeof OutputSchema>;
