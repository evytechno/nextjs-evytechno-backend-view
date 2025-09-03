const DropDown = ({
  name,
  placeholder,
  options,
  required,
  errors,
  ...props
}: {
  name: string;
  placeholder: string;
  options: { _id: string; name: string }[];
  required?: boolean;
  errors?: Record<string, { message?: string }>;
} & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className="flex flex-col">
      <div className="dropdown-menu">
        <select
          title={placeholder}
          className={
            "w-full border-2 border-[#E5E7EB] rounded-3xl p-3" +
            (errors && errors[name] ? " border-red-500" : "")
          }
          name={name}
          defaultValue=""
          required={required}
          {...props}
        >
          <option value="" disabled>
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
      </div>
      {errors && errors[name] && errors[name].message && (
        <p className="text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default DropDown;
