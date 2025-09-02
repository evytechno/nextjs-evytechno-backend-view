// components/QuillEditor.js
"use client";

import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface TextEditorProps {
  value: string;
  onContentChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],

    ["clean"],
  ],
};
const TextEditor = ({ value, onContentChange }: TextEditorProps) => {
  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onContentChange}
        modules={modules}
        theme="snow"
      />
    </div>
  );
};

export default TextEditor;
