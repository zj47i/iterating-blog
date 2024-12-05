import React from "react";
import { Link } from "react-router-dom";
import "./AppHeader.css";

const AppHeader: React.FC = () => {
    return (
        <header className="app-header">
            <div className="app-header-logo">Logo</div>
            <nav className="app-header-nav">
                <Link to="/draft/write" className="nav-item">
                    글쓰기
                </Link>
                <Link to="/drafts" className="nav-item">
                    글 목록
                </Link>
            </nav>
        </header>
    );
};

export default AppHeader;
