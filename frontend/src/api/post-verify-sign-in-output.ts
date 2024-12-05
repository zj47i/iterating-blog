import { PostVerifySignInOutput } from "@blog/interface";
import { post } from "./http";

export const postVerifySignInOutput = async (
    body: PostVerifySignInOutput.Input
): Promise<PostVerifySignInOutput.Output> => {
    return await post<
        PostVerifySignInOutput.Input,
        PostVerifySignInOutput.Output
    >({
        path: "/authentication/verify-sign-in-output",
        body,
    });
};
