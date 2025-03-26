import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Delta from "quill-delta";
import Quill from "quill";

import { useAuth } from "../context/AuthProvider";
import { getDraft } from "../api/get-draft";
import { putDraft } from "../api/put-draft";
import { deleteDraft } from "../api/delete-draft";
import { selectHeaders } from "../lib/select-headers";

import DraftIndex from "../component/DraftIndex/DraftIndex";
import DraftEditor from "../component/DraftEditor/DraftEditor";

const DraftEdit: React.FC = () => {
    const [delta, setDelta] = useState<Delta>(new Delta());
    const [content, setContent] = useState<string | null>(null);
    const [headers, setHeaders] = useState<HTMLHeadElement[]>([]);
    const titleRef = useRef<HTMLInputElement>(null);

    const { search } = useLocation();
    const navigate = useNavigate();
    const { authenticate } = useAuth();

    const id = new URLSearchParams(search).get("id");
    const draftId = id ? Number(id) : null;

    useEffect(() => {
        if (!draftId) return;

        const fetchDraft = async () => {
            try {
                const { draft } = await getDraft({ id: draftId });
                if (titleRef.current) {
                    titleRef.current.value = draft.title;
                }
                setDelta(new Delta(JSON.parse(draft.content)));
            } catch (err) {
                console.warn("Failed to fetch draft:", err);
            }
        };

        fetchDraft();
    }, [draftId]);

    const onTextChange = (quill: Quill) => {
        setContent(JSON.stringify(quill.getContents()));
        setHeaders(selectHeaders(quill.root));
    };

    const save = async () => {
        if (!draftId || !content || !titleRef.current?.value) return;

        try {
            const idToken = await authenticate();
            const { draft } = await putDraft(
                {
                    id: draftId,
                    content,
                    title: titleRef.current.value,
                },
                {
                    authorization: `Bearer ${idToken}`,
                }
            );
            navigate(`/draft/read?id=${draft.id}`);
        } catch (err) {
            console.warn("Failed to save draft:", err);
        }
    };

    const del = async () => {
        if (!draftId) return;

        try {
            const idToken = await authenticate();
            await deleteDraft(
                { id: draftId },
                {
                    authorization: `Bearer ${idToken}`,
                }
            );
            navigate("/drafts");
        } catch (err) {
            console.warn("Failed to delete draft:", err);
        }
    };

    return (
        <>
            <DraftIndex headers={headers} />
            <DraftEditor
                delta={delta}
                onTextChange={onTextChange}
                setHeaders={setHeaders}
                save={save}
                del={del}
                titleRef={titleRef}
            />
        </>
    );
};

export default DraftEdit;
