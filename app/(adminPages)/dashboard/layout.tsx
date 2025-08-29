import SideBar from "../ui/dashboard/sidebar";
import Header from "../ui/header/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full gap-4">
      <SideBar />
      <div className="flex flex-col gap-3 w-full">
        <Header />
        <>{children}</>
      </div>
    </div>
  );
};

export default Layout;
