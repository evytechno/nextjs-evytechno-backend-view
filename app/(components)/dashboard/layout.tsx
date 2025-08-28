import SideBar from "../ui/dashboard/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full">
      <SideBar />
      <>{children}</>
    </div>
  );
};

export default Layout;
