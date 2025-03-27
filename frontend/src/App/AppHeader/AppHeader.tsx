import React from "react";
import { Link } from "react-router-dom";
import "./AppHeader.css";

const AppHeader: React.FC = () => {
    return (
        <header>
            <h1>My Iterating Blog</h1>
            <nav>
                <a href="#">Home</a>
                <Link to="/drafts">
                    Drafts
                </Link>
            </nav>
        </header>
    );
};

export default AppHeader;
