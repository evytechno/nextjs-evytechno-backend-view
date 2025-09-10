const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={` w-full h-auto shadow-lg rounded-3xl p-5 border border-[#ccc]/40 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
