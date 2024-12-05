import { useRef } from "react";

interface HeaderWithAnchorProps {
    headers: HTMLHeadElement[];
}

const DraftIndexTable: React.FC<HeaderWithAnchorProps> = ({ headers }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    if (headers.length === 0) {
        return null;
    }
    return (
        <div className="draft-index-table" ref={containerRef}>
            {headers.map((header, index) => {
                const headerId = `header-${index}`;
                const anchorId = `elmt-${index}`;
                header.setAttribute("id", headerId);
                const headerNumber = Number(header.tagName.match(/\d+/)![0]);
                const ensp = "\u2003".repeat(headerNumber - 1);
                return (
                    <div key={anchorId}>
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
                    </div>
                );
            })}
        </div>
    );
};

export default DraftIndexTable;
