import { PostDraft } from "@blog/interface";
import { post } from "./http";

export const postDraft = async (
    input: PostDraft.Input,
    headers: PostDraft.Headers
): Promise<PostDraft.Output> => {
    return await post<PostDraft.Input, PostDraft.Output>({
        body: input,
        path: `/draft`,
        headers
    });
};
