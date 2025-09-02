const DropDown = ({
  name,
  placeholder,
  options,
}: {
  name: string;
  placeholder: string;
  options: { _id: string; name: string }[];
}) => {
  return (
    <select
      title={placeholder}
      className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
      name={name}
    >
      <option value="none" disabled selected>
        {placeholder}
      </option>

      {options.map((option) => {
        return (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default DropDown;
