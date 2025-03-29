import { useEffect, useRef } from "react";
import Quill from "quill";
import hljs from "highlight.js";
import styles from "./DraftEditor.module.css";
import Delta from "quill-delta";
import { toolbarOptions } from "./tool-bar-options";
import { selectHeaders } from "../../lib/select-headers";

export default ({
    titleRef,
    delta,
    setHeaders,
    onTextChange,
    save,
    del,
}: {
    titleRef: React.RefObject<HTMLInputElement>;
    delta?: Delta;
    setHeaders: React.Dispatch<React.SetStateAction<HTMLHeadElement[]>>;
    onTextChange: (quill: Quill) => void;
    save: Function;
    del?: Function;
}) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const qlContentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!editorRef.current || !qlContentRef.current) return;

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
        } else {
            if (!(toolbar instanceof HTMLDivElement)) {
                console.error("Quill element is not div");
                return;
            }
        }

        setHeaders(selectHeaders(quill.root));

        quill.on(Quill.events.TEXT_CHANGE, () => {
            onTextChange(quill);
        });

        const handleScroll = () => {
            if (!editorRef.current || !toolbar) return;
            const editorTop = editorRef.current.offsetTop;
            const scrollY = window.scrollY;
            if (scrollY >= editorTop) {
                toolbar.style.position = "sticky";
                toolbar.style.top = "0px";
                toolbar.style.zIndex = "100";
                toolbar.style.width = getComputedStyle(editorRef.current).width;
            } else {
                toolbar.style.position = "relative";
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            editor.removeChild(toolbar);
            content.removeChild(quill.root);
        };
    }, [delta, setHeaders]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <div ref={editorRef}>
                <div className={styles["editor-banner"]}>
                    You are currently editing this document. Don't forget to
                    save your changes.
                </div>
                <div>
                    <input
                        className={styles["editor-title"]}
                        type="text"
                        ref={titleRef}
                    />
                </div>
                <div className={styles["ql-container"]} ref={qlContentRef} />
                <div className={styles.toolbar}>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            save();
                        }}
                    >
                        Save
                    </a>
                    {del && (
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                del();
                            }}
                        >
                            Delete
                        </a>
                    )}
                </div>
            </div>
        </>
    );
};
