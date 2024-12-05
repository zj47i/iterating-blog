import z from "zod";

export const DraftSchema = z.object({
    createdAt: z.date(),
    title: z.string(),
    content: z.string(),
    writer: z.string(),
    id: z.number(),
});

export type Draft = z.infer<typeof DraftSchema>;
