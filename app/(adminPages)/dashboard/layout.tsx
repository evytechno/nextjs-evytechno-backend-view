import SideBar from "../../ui/dashboard/sidebar";
import Header from "../../ui/header/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full ">
      <SideBar />
      <div className="flex flex-col gap-3 w-full h-screen overflow-y-auto no-scrollbar pb-5">
        <Header />
        <div className="px-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
