import { forwardRef, useEffect, useRef } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import Delta from "quill-delta";

type Props = {
    onTextChange: (quill: Quill) => void;
    defaultDelta: Delta | undefined;
    readOnly: boolean;
};

const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [
        "link",
        "image",
        // "video",
        // "formula"
    ],

    [
        { header: 1 },
        { header: 2 },
        { header: 3 },
        // { header: 4 },
        // { header: 5 },
        // { header: 6 },
    ], // custom button values
    [
        // { list: "ordered" },
        { list: "bullet" },
        // { list: "check" },
    ],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    // [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    // [{ align: [] }],

    ["clean"], // remove formatting button
];

const ForwardedEditor = forwardRef<Quill, Props>(
    ({ onTextChange, defaultDelta, readOnly = false }, quillRef) => {
        if (typeof quillRef === "function") {
            console.error("Editor component does not support functional refs");
            return null;
        }

        const containerRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            if (quillRef === null) {
                console.error("Editor component does not support null refs");
                return;
            }

            const editorDiv = container.appendChild(
                container.ownerDocument.createElement("div")
            );

            if (readOnly) {
                quillRef.current = new Quill(editorDiv, {
                    theme: "bubble",
                    modules: {
                        syntax: {
                            hljs,
                        },
                    },
                    readOnly: readOnly,
                });
            } else {
                quillRef.current = new Quill(editorDiv, {
                    theme: "snow",
                    modules: {
                        toolbar: toolbarOptions,
                        syntax: {
                            hljs,
                        },
                    },
                });
            }

            quillRef.current.on(Quill.events.TEXT_CHANGE, () => {
                if (quillRef.current === null) {
                    console.error("Quill editor failed to initialize");
                    return;
                }
                onTextChange(quillRef.current);
            });
            if (defaultDelta) {
                quillRef.current.setContents(defaultDelta);
            }

            const handleScroll = () => {
                const toolbar =
                    document.getElementsByClassName("ql-toolbar")[0];
                if (!(toolbar instanceof HTMLDivElement)) {
                    console.error("Quill element is not div");
                    return;
                }
                if (toolbar && editorDiv) {
                    const editorTop = editorDiv.offsetTop;
                    const scrollY = window.scrollY;
                    if (scrollY >= editorTop) {
                        toolbar.style.position = "sticky";
                        toolbar.style.top = "0px";
                        toolbar.style.zIndex = "100";
                        toolbar.style.width = getComputedStyle(editorDiv).width;
                    } else {
                        toolbar.style.position = "relative";
                    }
                }
            };

            window.addEventListener("scroll", handleScroll);

            return () => {
                container.innerHTML = "";
                window.removeEventListener("scroll", handleScroll);
            };
        }, [defaultDelta]);
        
        return <div className="draft-content" ref={containerRef}></div>;
    }
);

ForwardedEditor.displayName = "Editor";

export default ForwardedEditor;
