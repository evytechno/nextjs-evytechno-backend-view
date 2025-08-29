const Input = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  return (
    <input
      className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
