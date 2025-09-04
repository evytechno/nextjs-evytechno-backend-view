"use client";
export const Button = ({
  children,

  className,
  ...props
}: {
  children: React.ReactNode;

  className: string;
}) => {
  return (
    <button
      //   onClick={(e) => onClick}

      className={` ${className} flex justify-center items-center   text-white font-semibold py-3 px-4 rounded-3xl`}
      {...props}
    >
      {children}
    </button>
  );
};
