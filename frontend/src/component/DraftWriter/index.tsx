import { useEffect, useRef } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import "./index.css";
import Delta from "quill-delta";
import { toolbarOptions } from "./tool-bar-options";
import { selectHeaders } from "../../lib/select-headers";

export default ({
    delta,
    setHeaders,
    onTextChange,
}: {
    delta?: Delta;
    setHeaders: React.Dispatch<React.SetStateAction<HTMLHeadElement[]>>;
    onTextChange: (quill: Quill) => void;
}) => {
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
                syntax: { hljs },
                toolbar: toolbarOptions,
            },
        });

        if (delta) {
            quill.setContents(delta);
        }

        const toolbar = editor.querySelector(".ql-toolbar");
        if (!toolbar) {
            console.error("Quill toolbar not found.");
            return;
        }

        const headers = selectHeaders(quill.root);
        setHeaders(headers);

        quill.on(Quill.events.TEXT_CHANGE, () => {
            if (quill === null) {
                console.error("Quill editor failed to initialize");
                return;
            }
            onTextChange(quill);
        });

        const handleScroll = () => {
            const toolbar = document.getElementsByClassName("ql-toolbar")[0];
            if (!(toolbar instanceof HTMLDivElement)) {
                console.error("Quill element is not div");
                return;
            }

            if (toolbar && editorRef) {
                if (editorRef.current === null) {
                    return;
                }
                const editorTop = editorRef.current.offsetTop;
                const scrollY = window.scrollY;
                if (scrollY >= editorTop) {
                    toolbar.style.position = "sticky";
                    toolbar.style.top = "0px";
                    toolbar.style.zIndex = "100";
                    toolbar.style.width = getComputedStyle(
                        editorRef.current
                    ).width;
                } else {
                    toolbar.style.position = "relative";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            editor.removeChild(toolbar);
            content.removeChild(quill.root);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [delta]);

    return (
        <div className="editor" ref={editorRef}>
            <div className="ql-content" ref={qlContentRef} />
        </div>
    );
};
