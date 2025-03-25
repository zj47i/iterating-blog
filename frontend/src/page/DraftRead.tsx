import Delta from "quill-delta";
import DraftReader from "../component/DraftReader/DraftReader";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDraft } from "../api/get-draft";
import DraftIndexTable from "../component/DraftIndexTable/DraftIndexTable";

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
            <DraftIndexTable headers={headers} />
            <DraftReader
                title={title}
                delta={delta}
                setHeaders={setHeaders}
                navigateToEdit={navigateToEdit}
            />
        </>
    );
};

export default DraftRead;
