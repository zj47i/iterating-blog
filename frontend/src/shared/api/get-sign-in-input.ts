import { GetSignInInput } from "@blog/interface";
import { get } from "./http";

export const getSignInData = async (): Promise<GetSignInInput.Output> => {
    return await get<GetSignInInput.Input, GetSignInInput.Output>({
        path: "/authentication/sign-in-input",
    });
};
