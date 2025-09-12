export const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [
        "link",
        "image",
        // "video",
        // "formula"
    ],

    [
        { header: 2 },
        { header: 3 },
        { header: 4 },
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