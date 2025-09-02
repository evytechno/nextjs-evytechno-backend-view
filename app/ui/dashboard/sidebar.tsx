"use client";

import Link from "next/link";
import NavLinks from "./nav-links";

export default function SideBar() {
  return (
    <div className="relative flex h-screen flex-col gap-3.5 bg-[#1C2536] py-2 px-5 overflow-hidden">
      <Link
        className="text-white text-lg font-semibold justify-start items-end mb-3"
        href="/dashboard"
      >
        EvyTechno
      </Link>

      <div className="flex flex-col gap-2.5 items-start ">
        <NavLinks />
      </div>
    </div>
  );
}
