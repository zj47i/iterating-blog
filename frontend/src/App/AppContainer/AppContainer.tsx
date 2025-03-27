import React from "react";
import "./AppContainer.css";
import { Route, Routes } from "react-router-dom";
import DraftRead from "../../page/DraftRead";
import DraftEdit from "../../page/DraftEdit";
import Drafts from "../../page/Drafts";
import DraftWrite from "../../page/DraftWrite";

const AppContainer: React.FC = () => {
    return (
        <main>
            <Routes>
                <Route path="draft/read" element={<DraftRead />} />
                <Route path="draft/edit" element={<DraftEdit />} />
                <Route path="draft/write" element={<DraftWrite />} />
                <Route path="drafts" element={<Drafts />} />
            </Routes>
        </main>
    );
};

export default AppContainer;
