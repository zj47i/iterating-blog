import { Draft } from "../../type/draft.js";
import { PaginationInput, PaginationOutput } from "../../type/pagination.js";

export interface Input {
    pagination: PaginationInput;
}

export interface Output {
    drafts: Draft[];
    pagination: PaginationOutput;
}
