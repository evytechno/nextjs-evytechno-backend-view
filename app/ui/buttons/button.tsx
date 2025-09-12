"use client";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${
        className ? className : ""
      } flex justify-center items-center text-white font-semibold py-3 px-4 rounded-3xl`}
    >
      {children}
    </button>
  );
};
