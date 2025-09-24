import Link from "next/link";

import ActionIcons from "./action-iconset";
import HeaderTitle from "../page-header/header-title";

const Header = () => {
  return (
    <div className="flex pl-4 w-full justify-between items-center pb-4 pt-3 pr-4 sticky top-0 bg-white/20 backdrop-blur-sm shadow layout-header">
      <Link href="/dashboard">
        <HeaderTitle>Admin Panel</HeaderTitle>
      </Link>
      <ActionIcons />
    </div>
  );
};

export default Header;
