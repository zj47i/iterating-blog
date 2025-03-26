import React from "react";
import "./AppContainer.css";
import { Route, Routes } from "react-router-dom";
import DraftRead from "../../page/DraftRead";
import DraftEdit from "../../page/DraftEdit";
import D from "../../page/Drafts";

const AppContainer: React.FC = () => {
    return (
        <div className="app-container">
            <Routes>
                <Route path="draft/read" element={<DraftRead />} />
                <Route path="draft/edit" element={<DraftEdit />} />
                <Route path="draft/list" element={<D />} />
            </Routes>
        </div>
    );
};

export default AppContainer;
