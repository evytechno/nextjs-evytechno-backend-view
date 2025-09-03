"use client";
export const Button = ({
  children,
  onClick,
  type,
  className,
}: {
  children: React.ReactNode;
  onClick: (e: HTMLButtonElement) => void;
  type: "submit" | "reset" | "button" | undefined;
  className: string;
}) => {
  return (
    <button
      //   onClick={(e) => onClick}
      type={type}
      className={` ${className} flex justify-center items-center   text-white font-semibold py-3 px-4 rounded-3xl`}
    >
      {children}
    </button>
  );
};
