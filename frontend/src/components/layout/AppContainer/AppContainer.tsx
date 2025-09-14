import React from "react";
import "./AppContainer.css";
import { Route, Routes } from "react-router-dom";
import DraftReadPage from "../../../pages/draft/DraftReadPage";
import DraftEditPage from "../../../pages/draft/DraftEditPage";
import DraftsPage from "../../../pages/drafts/DraftsPage";
import DraftWritePage from "../../../pages/draft/DraftWritePage";

const AppContainer: React.FC = () => {
    return (
        <main>
            <Routes>
                <Route path="draft/read" element={<DraftReadPage />} />
                <Route path="draft/edit" element={<DraftEditPage />} />
                <Route path="draft/write" element={<DraftWritePage />} />
                <Route path="drafts" element={<DraftsPage />} />
            </Routes>
        </main>
    );
};

export default AppContainer;
