import React from "react";
import "./AppContainer.css";
import { Route, Routes } from "react-router-dom";
import DraftRead from "../../page/DraftRead";

const AppContainer: React.FC = () => {
    return (
        <div className="app-container">
            <Routes>
                <Route path="draft/read" element={<DraftRead />} />
            </Routes>
        </div>
    );
};

export default AppContainer;
