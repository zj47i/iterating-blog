import React from "react";
import "./DraftIndex.css";

const DraftIndex: React.FC = () => {
    return (
        <aside className="app-draft-index">
            <h3>Contents</h3>
            <ul>
                <li>
                    <a href="#simplicity">1.1 Simplicity</a>
                </li>
                <li>
                    <a href="#modernity">1.2 Modernity</a>
                </li>
                <li>
                    <a href="#pragmatism">1.3 Pragmatism</a>
                </li>
                <li>
                    <a href="#user-centrality">1.4 User centrality</a>
                </li>
                <li>
                    <a href="#versatility">1.5 Versatility</a>
                </li>
            </ul>
        </aside>
    );
};

export default DraftIndex;
