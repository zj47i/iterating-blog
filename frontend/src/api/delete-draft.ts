import { PutDraft } from "@blog/interface";
import { del } from "./http";

export const deleteDraft = async (
    input: PutDraft.Input,
    headers: PutDraft.Headers
): Promise<PutDraft.Output> => {
    return await del<PutDraft.Input, PutDraft.Output>({
        body: input,
        path: `/draft`,
        headers,
    });
};
