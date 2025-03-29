import React from "react";
import { Link } from "react-router-dom";
import "./AppHeader.css";

const AppHeader: React.FC = () => {
    return (
        <header>
            <h1>
                <Link to="/drafts" style={{ all: "unset", cursor: "pointer" }}>
                    Blog on Iterating
                </Link>
            </h1>
            <nav>
                <Link to="/drafts">Home</Link>
            </nav>
        </header>
    );
};

export default AppHeader;
