import React, { useEffect, useState } from "react";
import { getDrafts } from "../api/get-drafts";
import { useLocation } from "react-router-dom";
import DraftList from "../component/DraftList/DraftList";
import { Draft } from "../../../interface/dist/esm/type/draft";

const Drafts: React.FC = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const page = Number(params.get("page") ?? 1);
    const [currentPage, setCurrentPage] = useState(page);
    const [pageCount, setPageCount] = useState(1);

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const fetchDrafts = async (page: number) => {
            const skip = (page - 1) * ITEMS_PER_PAGE;
            const { drafts, pagination } = await getDrafts({
                pagination: {
                    skip,
                    take: ITEMS_PER_PAGE,
                },
            });

            setDrafts(drafts);
            setPageCount(Math.ceil(pagination.total / ITEMS_PER_PAGE));
        };

        fetchDrafts(currentPage);
    }, [currentPage]);

    return (
        <>
            <DraftList
                drafts={drafts}
                currentPage={currentPage}
                pageCount={pageCount}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};

export default Drafts;
