import { GetDraft } from "@blog/interface";
import { get } from "./http";

export const getDraft = async (
    input: GetDraft.Input
): Promise<GetDraft.Output> => {
    return await get<GetDraft.Input, GetDraft.Output>({
        path: "/draft",
        query: input,
    });
};
