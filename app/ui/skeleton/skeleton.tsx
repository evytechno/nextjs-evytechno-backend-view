// components/ui/Skeleton.tsx
import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "1rem",
  rounded = "md",
  className,
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-gray-300",
        `rounded-${rounded}`,
        className
      )}
      style={{ width, height }}
    />
  );
}
