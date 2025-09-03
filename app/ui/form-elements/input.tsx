const Input = ({
  name,
  placeholder,
  type,
  required,
  errors,
  ...props
}: {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  errors?: Record<string, { message?: string }>;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col">
      <input
        className={
          "w-full border-2 border-[#E5E7EB] rounded-3xl p-3" +
          (errors && errors[name] ? " border-red-500" : "")
        }
        name={name}
        placeholder={placeholder}
        type={type ? type : ""}
        required={required}
        {...props}
      />
      {errors && errors[name] && errors[name].message && (
        <p className="text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
