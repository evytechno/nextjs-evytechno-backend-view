import BellIcon from "@/public/static/notification-icon.png";
import SearchIcon from "@/public/static/Button - Search.png";

import HeadIcons from "../image-comp/head-icon-comp";

const ActionIcons = () => {
  return (
    <div className="flex gap-5">
      {/* <Image src={SearchIcon} alt="SearchIcon" height={40} width={40}/>
      <Image src={BellIcon} alt="BellIcon" /> */}
      <HeadIcons src={SearchIcon} altName="SearchIcon" />
      <HeadIcons src={BellIcon} altName="BellIcon" />
    </div>
  );
};

export default ActionIcons;
