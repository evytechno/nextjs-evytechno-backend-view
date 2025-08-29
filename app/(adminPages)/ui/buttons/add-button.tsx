import { redirect } from "next/navigation";

const AddButton = ({ link }: { link: string }) => {
  return (
    <button
      className="px-8 text-[14px] font-semibold text-white flex items-center gap-1.5 rounded-2xl bg-[#6366F1]"
      onClick={(e) => redirect(link)}
    >
      <span className="text-[20px]">+</span>
      <span>Add</span>
    </button>
  );
};

export default AddButton;
