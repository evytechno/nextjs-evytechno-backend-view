import { ChangeEventHandler } from "react";

const FileInput = ({
  name,
  placeholder,
  accept,
  onChange,
}: {
  name: string;
  placeholder: string;
  accept: string | undefined;
  onChange: (e: ChangeEventHandler) => void;
}) => {
  return (
    <input
      className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
      name={name}
      placeholder={placeholder}
      type="file"
      accept={accept}
      onChange={onChange}
    />
  );
};

export default FileInput;
