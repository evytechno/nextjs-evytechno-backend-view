"use client";

import { Editor } from "@tinymce/tinymce-react";

interface TextEditorProps {
  value: string;
  onContentChange: (value: string) => void;
  name: string;
  placeholder?: string | undefined;
  className: string;
  rows: number;
  cols: number;
  required: boolean;
  errors?: Record<string, { message?: string }>;
}

export default function TextEditor({
  value,
  onContentChange,
  placeholder,
  name,
  className,
  rows,
  cols,
  required,
  errors,
  ...props
}: TextEditorProps) {
  const height = rows * 24;
  const width = cols * 8;
  return (
    <div className={`tinymce-editor ${className}`}>
      <Editor
        apiKey="on1jyb5tay7fhpvfggirzpgv6shpmyv3p08nbs4rtdlaw6j2"
        init={{
          plugins: [
            // Core editing features

            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            "code",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Sep 24, 2025:
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat | code",
          tinycomments_mode: "embedded",
          tinycomments_author: "EvyTechno",
          placeholder: placeholder || "",
          height: height,
          width: width,
          menubar: "", // adds happy to the menu bar
        }}
        value={value}
        onChange={onContentChange}
      />
    </div>
  );
}

// // components/QuillEditor.js
// "use client";

// import dynamic from "next/dynamic";

// import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// // Dynamically import ReactQuill to avoid SSR issues
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// interface TextEditorProps {
//   value: string;
//   onContentChange: (value: string) => void;
//   name: string;
//   placeholder: string;
//   className: string;
//   rows: number;
//   cols: number;
//   required: boolean;
//   errors?: Record<string, { message?: string }>;
// }

// const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["link", "image"],

//     ["clean"],
//   ],
// };
// const TextEditor = ({
//   value,
//   onContentChange,
//   placeholder,
//   name,
//   className,
//   rows,
//   cols,
//   required,
//   errors,
//   ...props
// }: TextEditorProps) => {
//   const height = rows * 24;
//   const width = cols * 8;
//   return (
//     <div className="flex flex-col">
//       <ReactQuill
//         name={name}
//         value={value}
//         onChange={onContentChange}
//         modules={modules}
//         theme="snow"
//         placeholder={placeholder}
//         className={
//           `overflow-y-visible border rounded-md ${className}` +
//           (errors && errors[name] ? " border-red-500" : "")
//         }
//         style={{
//           height: `${height}px`,
//           width: `${width}px`,
//         }}
//       />
//       {errors && errors[name] && errors[name].message && (
//         <p className="text-red-500">{errors[name].message}</p>
//       )}
//     </div>
//   );
// };

// export default TextEditor;
