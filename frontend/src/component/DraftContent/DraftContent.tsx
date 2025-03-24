import React from "react";
import "./DraftContent.css";

const DraftContent: React.FC = () => {
    return (
        <main className="app-draft-content">
            <h2>Principles</h2>
            <h3 id="simplicity">1.1 Simplicity</h3>
            <p>
                Arch Linux defines simplicity as{" "}
                <em>without unnecessary additions or modifications</em>. It
                ships software as released by the original developers.
            </p>
            <h3 id="modernity">1.2 Modernity</h3>
            <p>
                Arch Linux strives to maintain the latest stable release
                versions of its software, using a{" "}
                <strong>rolling-release</strong> system with continuous
                upgrades.
            </p>
            <h3 id="pragmatism">1.3 Pragmatism</h3>
            <p>
                Arch is a pragmatic distribution. Design decisions are made
                through developer consensus with emphasis on practical benefits.
            </p>
            <h3 id="user-centrality">1.4 User centrality</h3>
            <p>
                Arch is designed for users who are willing to make decisions and
                understand how the system works.
            </p>
            <h3 id="versatility">1.5 Versatility</h3>
            <p>
                Arch aims to be versatile, simple and adaptable to the user's
                needs.
            </p>
            <div className="toolbar">
                <a href="#">Edit</a>
                <a href="#">View Source</a>
                <a href="#">History</a>
            </div>
        </main>
    );
};

export default DraftContent;
