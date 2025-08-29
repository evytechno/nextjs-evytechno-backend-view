import Link from "next/link";
import PageTitle from "../text-comp/pageTitle";
import ActionIcons from "./action-iconset";

const Header = () => {
  return (
    <div className="flex w-full justify-between items-center mb-4 mt-3">
      <Link href="/dashboard">
        <PageTitle>Admin Panel</PageTitle>
      </Link>
      <ActionIcons />
    </div>
  );
};

export default Header;
