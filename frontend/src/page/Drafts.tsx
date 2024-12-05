import React, { useEffect, useState } from "react";
import { getDrafts } from "../api/get-drafts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Drafts.css";

type Draft = {
    createdAt: Date;
    title: string;
    content: string;
    id: number;
};

const Drafts: React.FC = () => {
    const [drafts, setDrafts] = useState<Draft[]>([]);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const page = Number(params.get("page") ?? 1);
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);
    const navigation = useNavigate();

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
            setTotalPages(Math.ceil(pagination.total / ITEMS_PER_PAGE));
        };

        fetchDrafts(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigation(`?page=${page}`); // URL 업데이트
    };

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year} - ${month} - ${day}`;
    };

    return (
        <div className="drafts">
            <table className="drafts-table">
                <tbody>
                    {drafts.map((draft) => (
                        <tr key={draft.id}>
                            <td>
                                <Link to={`/draft/read?id=${draft.id}`}>
                                    {draft.title}
                                </Link>
                            </td>
                            <td>{formatDate(draft.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="drafts-pagination">
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Drafts;
