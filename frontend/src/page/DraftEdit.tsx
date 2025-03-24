import { useEffect, useRef, useState } from "react";
import { putDraft } from "../api/put-draft";
import { useLocation, useNavigate } from "react-router-dom";
import Delta from "quill-delta";
import { getDraft } from "../api/get-draft";
import { useAuth } from "../context/AuthProvider";
import { deleteDraft } from "../api/delete-draft";
import DraftIndexTable from "../component/DraftIndexTable";
import DraftWriter from "../component/DraftWriter";
import { selectHeaders } from "../lib/html/select-headers";
import Quill from "quill";

const DraftEdit: React.FC = () => {
    const [delta, setDelta] = useState<Delta>(new Delta());
    const [content, setContent] = useState<string | null>(null);
    const [headers, setHeaders] = useState<HTMLHeadElement[]>([]);
    const titleRef = useRef<HTMLInputElement>(null);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");

    const navigation = useNavigate();
    const { authenticate } = useAuth();

    const onTextChange = (quill: Quill) => {
        if (setContent) {
            const content = JSON.stringify(quill.getContents());
            setContent(content);
        }
        const headers: HTMLHeadingElement[] = selectHeaders(quill.root);
        setHeaders(headers);
    };

    const edit = async () => {
        if (!id) {
            console.info("id is undefined");
            return;
        }
        if (!content) {
            console.info("content is undefined");
            return;
        }
        if (!titleRef.current?.value) {
            console.info("title is undefined");
            return;
        }

        const idToken = await authenticate();

        const { draft } = await putDraft(
            {
                id: Number(id),
                content: content,
                title: titleRef.current?.value,
            },
            {
                authorization: "Bearer " + idToken,
            }
        );
        navigation("/draft/read?id=" + draft.id);
    };

    const del = async () => {
        if (!id) {
            console.info("id is undefined");
            return;
        }

        const idToken = await authenticate();

        await deleteDraft(
            {
                id: Number(id),
            },
            {
                authorization: "Bearer " + idToken,
            }
        );
        navigation("/drafts");
    };

    useEffect(() => {
        const fetchDraft = async () => {
            if (!id) {
                console.info("id is undefined");
                return;
            }

            if (!titleRef.current) {
                console.info("titleRef is undefined");
                return;
            }

            const { draft } = await getDraft({ id: parseInt(id) });
            titleRef.current.value = draft.title;

            setDelta(new Delta(JSON.parse(draft.content)));
        };
        fetchDraft();
    }, [id]);

    return (
        <div className="draft-edit">
            <input type="text" ref={titleRef} />
            <div className="draft">
                <DraftIndexTable headers={headers} />
                <DraftWriter
                    delta={delta}
                    onTextChange={onTextChange}
                    setHeaders={setHeaders}
                />
            </div>
            <button onClick={edit}> 수정 </button>
            <button onClick={del}> 삭제 </button>
        </div>
    );
};

export default DraftEdit;
