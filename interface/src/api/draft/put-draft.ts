import { Draft } from "../../type/draft.js";

export type Headers = {
    authorization: string;
};

export type Input = {
    id: number;
    title?: string;
    content?: string;
};

export type Output = {
    draft: Draft;
};
