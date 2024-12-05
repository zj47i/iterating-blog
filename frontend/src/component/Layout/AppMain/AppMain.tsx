import React from "react";
import { Routes, Route } from "react-router-dom";
import Drafts from "../../../page/Drafts";
import "./AppMain.css";
import DraftRead from "../../../page/DraftRead";
import DraftWrite from "../../../page/DraftWrite";
import DraftEdit from "../../../page/DraftEdit";

const AppMain: React.FC = () => {
    return (
        <main className="app-main">
            <Routes>
                <Route path="draft/read" element={<DraftRead />} />
                <Route path="draft/write" element={<DraftWrite />} />
                <Route path="draft/edit" element={<DraftEdit />} />
                <Route path="drafts" element={<Drafts />} />
            </Routes>
        </main>
    );
};

export default AppMain;
