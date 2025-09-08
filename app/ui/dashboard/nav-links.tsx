import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import home from "@/public/static/home.png";
import blog from "@/public/static/blog.png";
import Image from "next/image";

const links = [
  { name: "Home", href: "/dashboard", icon: home },
  { name: "Blog", href: "/dashboard/blog", icon: blog },
  { name: "Service", href: "/dashboard/service", icon: home },
  { name: "Cases", href: "/dashboard/case", icon: blog },
  { name: "Element", href: "/dashboard/element", icon: blog },
  { name: "Pages", href: "/dashboard/pages", icon: home },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex w-full h-[40px] py-2 px-5 grow items-center justify-items-center justify-start  gap-4  text-sm  font-medium text-[#9DA4AE] hover:text-white",
              {
                "bg-white/10 font-semibold text-white border-r-3 border-r-white/90":
                  pathname === link.href,
              }
            )}
          >
            <Image src={link.icon} alt={link.name} width={20} height={20} />
            <p className="">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
