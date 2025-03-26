import Delta from "quill-delta";
import DraftContent from "../component/DraftContent/DraftContent";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDraft } from "../api/get-draft";
import DraftIndex from "../component/DraftIndex/DraftIndex";

const DraftRead: React.FC = () => {
    const [delta, setDelta] = useState<Delta>(new Delta());
    const [title, setTitle] = useState("");
    const [headers, setHeaders] = useState<HTMLHeadElement[]>([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const navigation = useNavigate();

    const navigateToEdit = () => {
        navigation(`/draft/edit?id=${id}`);
    };

    useEffect(() => {
        const fetchDraft = async () => {
            if (!id) {
                return;
            }
            const { draft } = await getDraft({ id: parseInt(id) });
            setTitle(draft.title);
            setDelta(new Delta(JSON.parse(draft.content)));
        };
        fetchDraft();
    }, [id]);

    return (
        <>
            <DraftIndex headers={headers} />
            <DraftContent
                title={title}
                delta={delta}
                setHeaders={setHeaders}
                navigateToEdit={navigateToEdit}
            />
        </>
    );
};

export default DraftRead;
