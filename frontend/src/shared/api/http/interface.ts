export interface HttpSuccessBody<T> {
    data: T;
}

export interface HttpFailBody {
    error: {
        status: number;
        message: string;
        code?: string;
    };
}
