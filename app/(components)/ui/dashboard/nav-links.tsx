import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/dashboard", icon: "" },
  { name: "Blog", href: "/dashboard/blog", icon: "" },
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
              "flex h-[35px] grow items-center justify-center gap-2 rounded-md text-sm p-3 font-medium text-gray-700 hover:text-blue-600",
              {
                "bg-gray-900 font-semibold text-gray-100":
                  pathname === link.href,
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
