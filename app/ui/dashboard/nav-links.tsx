import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: "" },
  { name: "Blog", href: "/dashboard/blog", icon: "" },
  { name: "Service", href: "/dashboard/service", icon: "" },
  { name: "Element", href: "/dashboard/element", icon: "" },
  { name: "Pages", href: "/dashboard/pages", icon: "" },
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
              "flex w-full h-[35px] grow items-center justify-center gap-2 rounded-md text-sm p-3 font-medium text-[#9DA4AE] hover:text-white",
              {
                "bg-white/10 font-semibold text-white": pathname === link.href,
              }
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
