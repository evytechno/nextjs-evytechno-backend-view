// components/QuillEditor.js
"use client";

import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface TextEditorProps {
  value: string;
  onContentChange: (value: string) => void;
  name: string;
  placeholder: string;
  className: string;
  rows: number;
  cols: number;
  required: boolean;
  errors?: Record<string, { message?: string }>;
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
  name,
  className,
  rows,
  cols,
  required,
  errors,
  ...props
}: TextEditorProps) => {
  const height = rows * 24;
  const width = cols * 8;
  return (
    <div className="flex flex-col">
      <ReactQuill
        name={name}
        value={value}
        onChange={onContentChange}
        modules={modules}
        theme="snow"
        placeholder={placeholder}
        className={
          `overflow-y-visible border rounded-md ${className}` +
          (errors && errors[name] ? " border-red-500" : "")
        }
        style={{
          height: `${height}px`,
          width: `${width}px`,
        }}
      />
      {errors && errors[name] && errors[name].message && (
        <p className="text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextEditor;
