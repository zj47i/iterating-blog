import { useEffect, useRef } from "react";
import Quill from "quill";
import Delta from "quill-delta";
import { selectHeaders } from "../../lib/select-headers";
import styles from "./DraftContent.module.css";

const quillHTML = (delta: Delta): string => {
    const tempCont = document.createElement("div");
    new Quill(tempCont).setContents(delta);
    return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
};

const titleHTML = (title: string): string => {
    return `<h1>${title}</h1>`;
};

const toolbarHTML = `
  <div class="${styles.toolbar}">
    <a href="#" id="toolbar-edit">Edit</a>
    <a href="#">History</a>
  </div>
`;

export default function DraftContent({
    title,
    delta,
    setHeaders,
    navigateToEdit,
}: {
    title: string;
    delta: Delta;
    setHeaders: React.Dispatch<React.SetStateAction<HTMLHeadElement[]>>;
    navigateToEdit: () => void;
}) {
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        // 1. render HTML
        const html = quillHTML(delta);
        content.innerHTML = titleHTML(title) + html + toolbarHTML;

        // 2. set headers
        const headers = selectHeaders(content);
        setHeaders(headers);

        // 3. bind Edit button
        const editBtn = document.getElementById("toolbar-edit");
        if (editBtn) {
            editBtn.addEventListener("click", handleEditClick);
        }

        return () => {
            if (editBtn) {
                editBtn.removeEventListener("click", handleEditClick);
            }
        };
    }, [delta]);

    const handleEditClick = (e: MouseEvent) => {
        e.preventDefault();
        navigateToEdit();
    };

    return <div className={styles["app-draft-content"]} ref={contentRef}></div>;
}
