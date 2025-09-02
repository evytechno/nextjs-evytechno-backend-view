const Input = ({
  name,
  placeholder,
  type,
}: {
  name: string;
  placeholder: string;
  type: string | undefined;
}) => {
  return (
    <input
      className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
      name={name}
      placeholder={placeholder}
      type={type ? type : ""}
    />
  );
};

export default Input;
