import { PostVerifySignature } from "@blog/interface";
import { post } from "./http";

export const postAuthentication = async (
    body: PostVerifySignature.Input
): Promise<PostVerifySignature.Output> => {
    return await post({
        path: "/authentication/verify-signature",
        body,
    });
};
