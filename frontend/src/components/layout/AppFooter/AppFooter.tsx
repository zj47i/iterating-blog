import React from "react";
import "./AppFooter.css";

/// <reference types="vite/client" />

declare const __BUILD_DATE__: string;

const AppFooter: React.FC = () => {
    const buildDate = new Date(__BUILD_DATE__).toLocaleString();

    return (
        <footer>
            <p>This page was last built on {buildDate}.</p>
        </footer>
    );
};

export default AppFooter;
