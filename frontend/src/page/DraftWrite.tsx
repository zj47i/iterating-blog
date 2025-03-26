// import { useRef, useState } from "react";
// import { postDraft } from "../api/post-draft";
// import { useNavigate } from "react-router-dom";

// import React from "react";
// import { useAuth } from "../context/AuthProvider";
// import DraftEditor from "../component/DraftEditor/DraftEditor";
// import { selectHeaders } from "../lib/select-headers";
// import Quill from "quill";
// import DraftIndexTable from "../component/DraftIndex/DraftIndex";

// import "./DraftWrite.css";

// const DraftWrite: React.FC = () => {
//     const [content, setContent] = useState<string | null>(null);
//     const [headers, setHeaders] = useState<HTMLHeadElement[]>([]);
//     const titleRef = useRef<HTMLInputElement>(null);

//     const navigation = useNavigate();
//     const { authenticate } = useAuth();

//     const write = async () => {
//         if (!content) return;
//         if (!titleRef.current?.value) return;

//         const { draft } = await postDraft(
//             {
//                 content: content,
//                 title: titleRef.current?.value,
//             },
//             {
//                 authorization: "Bearer " + (await authenticate()),
//             }
//         );
//         navigation("/draft/read?id=" + draft.id);
//     };

//     const onTextChange = (quill: Quill) => {
//         if (setContent) {
//             const content = JSON.stringify(quill.getContents());
//             setContent(content);
//         }
//         const headers: HTMLHeadingElement[] = selectHeaders(quill.root);
//         setHeaders(headers);
//     };

//     return (
//         <div className="draft-write">
//             <input type="text" ref={titleRef} />
//             <div className="draft">
//                 <DraftIndexTable headers={headers} />
//                 <DraftEditor
//                     delta={undefined}
//                     onTextChange={onTextChange}
//                     setHeaders={setHeaders}
//                 />
//             </div>
//             <button onClick={write}> 저장 </button>
//         </div>
//     );
// };

// export default DraftWrite;
