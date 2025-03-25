import React from "react";
import { Link } from "react-router-dom";
import "./AppHeader.css";

const AppHeader: React.FC = () => {
    return (
        <header className="app-header">
            <h1 className="app-header-logo">My Iterating Blog</h1>
            <nav className="app-header-nav">
                <a href="#">Home</a>
                <a href="#">Posts</a>
                <a href="#">Login</a>
                {/* <Link to="/draft/write" className="nav-item">
                    글쓰기
                </Link>
                <Link to="/drafts" className="nav-item">
                    글 목록
                </Link> */}
            </nav>
        </header>
    );
};

export default AppHeader;
