import z from "zod";

export const PaginationInputSchema = z.object({
    skip: z.number(),
    take: z.number(),
});
export type PaginationInput = z.infer<typeof PaginationInputSchema>;

export const PaginationOutputSchema = z.object({
    total: z.number(),
    skip: z.number(),
    take: z.number(),
});
export type PaginationOutput = z.infer<typeof PaginationOutputSchema>;
