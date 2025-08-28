"use client";

import Link from "next/link";
import NavLinks from "./nav-links";

export default function SideBar() {
  return (
    <div className="flex h-screen flex-col bg-[#1C2536] py-2 px-2">
      <Link
        className="text-white font-semibold justify-start items-end"
        href="/dashboard"
      >
        EvyTechno
      </Link>

      <div>
        <NavLinks />
      </div>
    </div>
  );
}
