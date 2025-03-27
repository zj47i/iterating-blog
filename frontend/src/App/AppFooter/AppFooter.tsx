import React from "react";
import "./AppFooter.css";

const AppFooter: React.FC = () => {
    return (
        <>
            <footer>
                <p>This page was last edited on 14 March 2025, at 08:17.</p>
                <p>
                    Content is available under{" "}
                    <a href="#">GNU Free Documentation License</a> unless
                    otherwise noted.
                    <br />
                    <a href="#">Privacy policy</a>
                    <a href="#">About ArchWiki</a>
                    <a href="#">Disclaimers</a>
                    <a href="#">Code of conduct</a>
                    <a href="#">Terms of service</a>
                </p>
            </footer>
        </>
    );
};

export default AppFooter;
