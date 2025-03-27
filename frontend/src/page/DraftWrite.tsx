import { useRef, useState } from "react";
import { postDraft } from "../api/post-draft";
import { useNavigate } from "react-router-dom";

import React from "react";
import { useAuth } from "../context/AuthProvider";
import DraftEditor from "../component/DraftEditor/DraftEditor";
import { selectHeaders } from "../lib/select-headers";
import Quill from "quill";

import DraftIndex from "../component/DraftIndex/DraftIndex";

const DraftWrite: React.FC = () => {
    const [content, setContent] = useState<string | null>(null);
    const [headers, setHeaders] = useState<HTMLHeadElement[]>([]);
    const titleRef = useRef<HTMLInputElement>(null);

    const navigation = useNavigate();
    const { authenticate } = useAuth();

    const save = async () => {
        if (!content) return;
        if (!titleRef.current?.value) return;

        const { draft } = await postDraft(
            {
                content: content,
                title: titleRef.current?.value,
            },
            {
                authorization: "Bearer " + (await authenticate()),
            }
        );
        navigation("/draft/read?id=" + draft.id);
    };

    const onTextChange = (quill: Quill) => {
        if (setContent) {
            const content = JSON.stringify(quill.getContents());
            setContent(content);
        }
        const headers: HTMLHeadingElement[] = selectHeaders(quill.root);
        setHeaders(headers);
    };

    return (
        <>
            <DraftIndex headers={headers} />
            <DraftEditor
                onTextChange={onTextChange}
                setHeaders={setHeaders}
                save={save}
                titleRef={titleRef}
            />
        </>
    );
};

export default DraftWrite;
