import { GetDrafts } from "@blog/interface";
import { get } from "./http";

export const getDrafts = async (
    input: GetDrafts.Input
): Promise<GetDrafts.Output> => {
    return await get<GetDrafts.Input, GetDrafts.Output>({
        path: "/drafts",
        query: input,
    });
};
