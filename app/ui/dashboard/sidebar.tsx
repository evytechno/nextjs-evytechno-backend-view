"use client";

import Link from "next/link";
import NavLinks from "./nav-links";
import Image from "next/image";

import logo from "@/public/static/logo-s.png";

export default function SideBar() {
  return (
    <div className="relative flex h-screen min-w-[200px] flex-col gap-3.5 bg-[#1C2536]  overflow-hidden">
      <Link
        className="text-white text-lg font-semibold  flex justify-center items-center max-w-full pt-4 "
        href="/dashboard"
      >
        <Image src={logo} alt="logo" height={42} />
        {/* <span> EvyTechno</span> */}
      </Link>
      <hr className="text-white/40" />

      <div className="flex flex-col gap-2.5 items-start ">
        <NavLinks />
      </div>
    </div>
  );
}
