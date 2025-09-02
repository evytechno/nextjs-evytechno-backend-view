"use client";

import Link from "next/link";
import NavLinks from "./nav-links";
import Image from "next/image";

import logo from "@/public/static/logo.png";

export default function SideBar() {
  return (
    <div className="relative flex h-screen min-w-[200px] flex-col gap-3.5 bg-[#1C2536]  overflow-hidden">
      <Link
        className="text-white text-lg font-semibold  flex justify-center items-center max-w-full  "
        href="/dashboard"
      >
        <Image src={logo} alt="logo" height={40} />
        <span> EvyTechno</span>
      </Link>
      <hr className="text-white/75" />

      <div className="flex flex-col gap-2.5 items-start ">
        <NavLinks />
      </div>
    </div>
  );
}
