import { useRef, useState } from "react";
import { postDraft } from "../../shared/api/post-draft";
import { useNavigate } from "react-router-dom";

import React from "react";
import { useAuth } from "../../shared/context/AuthProvider";
import DraftEditor from "./components/DraftEditor/DraftEditor";
import { selectHeaders } from "../../shared/lib/select-headers";
import Quill from "quill";

import DraftIndex from "../drafts/components/DraftIndex/DraftIndex";

const DraftWritePage: React.FC = () => {
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

export default DraftWritePage;
