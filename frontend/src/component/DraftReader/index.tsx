import { useEffect, useRef } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import "./index.css";
import Delta from "quill-delta";
import { selectHeaders } from "../../lib/html/select-headers";

export default ({
    delta,
    setHeaders,
}: {
    delta: Delta;
    setHeaders: React.Dispatch<React.SetStateAction<HTMLHeadElement[]>>;
}) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const qlContentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!editorRef.current) return;
        if (!qlContentRef.current) return;

        const content = qlContentRef.current;

        const quill = new Quill(content, {
            theme: "snow",
            modules: {
                syntax: { hljs },
                toolbar: false,
            },
        });

        quill.setContents(delta);

        const headers: HTMLHeadingElement[] = selectHeaders(quill.root);
        setHeaders(headers);

        return () => {
            content.removeChild(quill.root);
        };
    }, [delta]);

    return (
        <div className="editor" ref={editorRef}>
            <div className="ql-content" ref={qlContentRef} />
        </div>
    );
};
