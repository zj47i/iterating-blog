import qs from "qs";
import { BACKEND_BASE_URL } from "../../env";

export const post = async <INPUT, OUTPUT, HEADER = {}>(param: {
    path: string;
    body?: INPUT;
    headers?: HEADER;
}): Promise<OUTPUT> => {
    const { body, path, headers } = param;
    const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    });
    const resBody = await response.json();
    // for 2xx
    if (response.status >= 200 && response.status < 300) {
        return {
            ...resBody.data,
        };
    }
    throw new Error(resBody.error);
};

export const put = async <INPUT, OUTPUT, HEADER = {}>(param: {
    path: string;
    body?: INPUT;
    headers?: HEADER;
}): Promise<OUTPUT> => {
    const { body, path, headers } = param;
    const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    });
    const resBody = await response.json();
    // for 2xx
    if (response.status >= 200 && response.status < 300) {
        return {
            ...resBody.data,
        };
    }
    throw new Error(resBody.error);
};

export const del = async <INPUT, OUTPUT, HEADER = {}>(param: {
    path: string;
    body?: INPUT;
    headers?: HEADER;
}): Promise<OUTPUT> => {
    const { body, path, headers } = param;
    const response = await fetch(`${BACKEND_BASE_URL}${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify(body),
    });
    const resBody = await response.json();
    // for 2xx
    if (response.status >= 200 && response.status < 300) {
        return {
            ...resBody.data,
        };
    }
    throw new Error(resBody.error);
};

export const get = async <INPUT, OUTPUT>(param: {
    path: string;
    query?: INPUT;
    headers?: Record<string, string>;
}): Promise<OUTPUT> => {
    const { query, path, headers } = param;
    const querystring = qs.stringify(query);
    const response = await fetch(`${BACKEND_BASE_URL}${path}?${querystring}`, {
        method: "GET",
        headers: {
            ...headers,
        },
    });
    const resBody = await response.json();
    if (response.status >= 200 && response.status < 300) {
        return {
            ...resBody.data,
        };
    }
    throw new Error(resBody.error);
};
