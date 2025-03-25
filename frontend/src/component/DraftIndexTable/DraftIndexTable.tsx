import { useRef } from "react";
import "./DraftIndexTable.css";

interface HeaderWithAnchorProps {
    headers: HTMLHeadElement[];
}

const draftIndex = (headers: HTMLHeadElement[]) => {
    if (headers.length === 0) {
        return null;
    }

    return (
        <ul>
            {headers.map((header, index) => {
                const headerId = `header-${index}`;
                const anchorId = `elmt-${index}`;
                header.setAttribute("id", headerId);
                const headerNumber = Number(header.tagName.match(/\d+/)![0]);
                const ensp = "\u2003".repeat(headerNumber - 1);
                return (
                    <li key={anchorId}>
                        {ensp}
                        <a
                            href={`#${headerId}`}
                            style={{
                                marginLeft: "8px",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            🔗 {header.textContent}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};

const DraftIndexTable: React.FC<HeaderWithAnchorProps> = ({ headers }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    return (
        <aside className="app-draft-index" ref={containerRef}>
            <h3>Contents</h3>
            {draftIndex(headers)}
        </aside>
    );
};

export default DraftIndexTable;
