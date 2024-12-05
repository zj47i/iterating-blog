import { useEffect, useRef } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import "./index.css";
import { toolbarOptions } from "./toolbar";
import Delta from "quill-delta";

export default (delta: Delta) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const qlContentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!editorRef.current) return;
        if (!qlContentRef.current) return;

        const editor = editorRef.current;
        const content = qlContentRef.current;

        const quill = new Quill(content, {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions,
                syntax: { hljs },
            },
        });

        quill.setContents(delta);

        const toolbar = editor.querySelector(".ql-toolbar");
        if (!toolbar) {
            console.error("Quill toolbar not found.");
            return;
        }

        return () => {
            editor.removeChild(toolbar);
            content.removeChild(quill.root);
        };
    });

    return (
        <div className="editor" ref={editorRef}>
            <div className="ql-content" ref={qlContentRef} />
        </div>
    );
};
