import { PutDraft } from "@blog/interface";
import { put } from "./http";

export const putDraft = async (
    input: PutDraft.Input,
    headers: PutDraft.Headers
): Promise<PutDraft.Output> => {
    return await put<PutDraft.Input, PutDraft.Output>({
        body: input,
        path: `/draft`,
        headers,
    });
};
