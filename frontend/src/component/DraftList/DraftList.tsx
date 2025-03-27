import { Link, useNavigate } from "react-router-dom";
import { Draft } from "../../../../interface/dist/esm/type/draft";
import "./DraftList.css";

const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year} - ${month} - ${day}`;
};

export default function ({
    drafts,
    currentPage,
    pageCount,
    setCurrentPage,
}: {
    drafts: Draft[];
    currentPage: number;
    pageCount: number;
    setCurrentPage: (page: number) => void;
}) {
    const navigation = useNavigate();
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigation(`?page=${page}`); // URL 업데이트
    };
    return (
        <div className="draft-list-container">
            <h2>All Drafts</h2>
            <div className="draft-list">
                {drafts.map((draft) => (
                    <div className="draft-list-item" key={draft.id}>
                        <Link to={`/draft/read?id=${draft.id}`}>
                            {draft.title}
                        </Link>

                        <div className="draft-list-item-date">
                            {formatDate(draft.createdAt)}
                        </div>
                    </div>
                ))}
            </div>
            <div className="draft-list-pagination">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                    (page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={page === currentPage ? "active" : ""}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}
