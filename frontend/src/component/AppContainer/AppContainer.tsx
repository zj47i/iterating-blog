import React from "react";
import "./AppContainer.css";
import DraftIndex from "../DraftIndex/DraftIndex";
import DraftContent from "../DraftContent/DraftContent";

const AppContainer: React.FC = () => {
    return (
        <div className="app-container">
            <DraftIndex />
            <DraftContent />
            
        </div>
    );
};

export default AppContainer;
