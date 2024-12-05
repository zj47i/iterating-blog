import { GetSignatureMessage } from "@blog/interface";
import { get } from "./http";

export const getSignatureMessage =
    async (): Promise<GetSignatureMessage.Output> => {
        return await get<any, GetSignatureMessage.Output>({
            path: "/authentication/signature-message",
        });
    };
