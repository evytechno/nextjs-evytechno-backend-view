// components/QuillEditor.js
import dynamic from "next/dynamic";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type onContentChangeType = (content: string) => void;

const TextEditor = ({
  value,
  onContentChange,
}: {
  value: string;
  onContentChange: onContentChangeType;
}) => {
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ list: "ordered" }, { list: "bullet" }],

        ["clean"],
      ],
    }),
    []
  );

  const handleChange = useCallback(
    (content: string) => {
      onContentChange(content);
    },
    [onContentChange]
  );

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      modules={modules}
      theme="snow"
      preserveWhitespace
    />
  );
};

export default TextEditor;
