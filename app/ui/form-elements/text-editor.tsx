// components/QuillEditor.js
"use client";

import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface TextEditorProps {
  value: string;
  onContentChange: (value: string) => void;
  placeholder: string;
  className: string;
  rows: number;
  cols: number;
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
const TextEditor = ({
  value,
  onContentChange,
  placeholder,
  className,
  rows,
  cols,
}: TextEditorProps) => {
  const height = rows * 24;
  const width = cols * 8;
  return (
    <div>
      <ReactQuill
        value={value}
        onChange={onContentChange}
        modules={modules}
        theme="snow"
        placeholder={placeholder}
        className={`overflow-y-visible border rounded-md ${className}`}
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
      />
    </div>
  );
};

export default TextEditor;
