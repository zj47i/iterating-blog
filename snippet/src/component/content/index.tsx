import DraftIndexTable from "./DraftIndexTable";
import DraftContent from "./DraftContent";
import { useRef, useState } from "react";
import Quill from "quill";
import Delta from "quill-delta";
import "./index.css";

export enum DraftMode {
    READ,
    EDIT,
    WRITE,
}

const isHeadingElement = (element: Element): element is HTMLHeadingElement => {
    return /^H[1-6]$/i.test(element.tagName);
};

interface Props {
    delta?: Delta;
    mode: DraftMode;
    setContent?: React.Dispatch<React.SetStateAction<string | null>>;
}

const Editor: React.FC<Props> = ({ delta, mode, setContent }) => {
    const [headers, setHeaders] = useState<HTMLHeadElement[]>([]);
    const quillRef = useRef<Quill | null>(null);

    const handleTextChange = (quill: Quill) => {
        if (setContent) {
            const content = JSON.stringify(quill.getContents());
            setContent(content);
        }
        const html = quill.root;
        const headers: HTMLHeadingElement[] = Array.from(
            html.querySelectorAll("h1, h2, h3, h4, h5, h6")
        ).filter(isHeadingElement);

        setHeaders(headers);
    };

    return (
        <div className="draft">
            <DraftIndexTable headers={headers} />
            <DraftContent
                ref={quillRef}
                onTextChange={handleTextChange}
                defaultDelta={delta}
                readOnly={mode === DraftMode.READ}
            />
        </div>
    );
};

export default Editor;
