"use client";
import { Button } from "@/app/ui/buttons/button";

import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import PageTitle from "@/app/ui/text-comp/pageTitle";

import logo from "@/public/static/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/dashboard");
  };
  return (
    <div className=" bg-[#1C2536]">
      {/* Login banner */}
      <div
        // style={{ backgroundImage: `url(${loginBG.src})` }}
        // className="h-screen flex flex-col  items-center justify-center w-2/3 gap-2 bg-linear-to-tr  from-[#0EA5E9]/15    via-[#14B8A6]/15  to-[#6366F1]/15 "
        className=" bg-linear-100  from-[#14B8A6]/15    "
      >
        <div
          // style={{ backgroundImage: `url(${loginBG.src})` }}
          // className="h-screen flex flex-col  items-center justify-center w-2/3 gap-2 bg-linear-to-tr  from-[#0EA5E9]/15    via-[#14B8A6]/15  to-[#6366F1]/15 "
          className="flex bg-linear-80  from-[#6366F1]/15    "
        >
          <div
            // style={{ backgroundImage: `url(${loginBG.src})` }}
            // className="h-screen flex flex-col  items-center justify-center w-2/3 gap-2 bg-linear-to-tr  from-[#0EA5E9]/15    via-[#14B8A6]/15  to-[#6366F1]/15 "
            className="h-screen flex flex-col  items-center justify-center w-2/3 gap-2 h-14 bg-linear-100  from-[#0EA5E9]/15    "
          >
            <span className="font-bold text-3xl text-white">
              Welcome to EVY TECHNO
            </span>
            <Image src={logo} className="h-60 w-auto" alt="Logo" />
          </div>
          {/* Login Form */}
          <div className="w-1/3 flex flex-col items-center justify-center px-5 bg-white">
            <PageTitle>Log In</PageTitle>
            <form className="w-full" onSubmit={handleSubmit}>
              <FormLayout>
                <Input name="username" placeholder="Enter Username" />
                <Input name="password" placeholder="Password" />
                <Button type="submit" className="bg-[#6366F1]">
                  Log In
                </Button>
              </FormLayout>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
