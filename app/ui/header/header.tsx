import Link from "next/link";
import PageTitle from "../text-comp/pageTitle";
import ActionIcons from "./action-iconset";

const Header = () => {
  return (
    <div className="flex pl-4 w-full justify-between items-center pb-4 pt-3 pr-4 sticky top-0 bg-white/20 backdrop-blur-sm shadow">
      <Link href="/dashboard">
        <PageTitle>Admin Panel</PageTitle>
      </Link>
      <ActionIcons />
    </div>
  );
};

export default Header;
