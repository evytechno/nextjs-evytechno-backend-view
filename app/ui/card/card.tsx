const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  w-full h-auto shadow-lg rounded-3xl p-5 border border-[#ccc]/40 ">
      {children}
    </div>
  );
};

export default Card;
