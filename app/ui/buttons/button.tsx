"use client";
export const Button = ({
  children,
  //   onClick,
  type,
}: {
  children: React.ReactNode;
  //   onClick: (e: HTMLButtonElement) => void;
  type: "submit" | "reset" | "button" | undefined;
}) => {
  return (
    <button
      //   onClick={(e) => onClick}
      type={type}
      className="bg-[#6366F1] flex justify-center items-center text-white rounded-3xl p-2"
    >
      {children}
    </button>
  );
};
