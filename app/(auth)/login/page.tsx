"use client";
import { Button } from "@/app/ui/buttons/button";

import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import loginBG from "@/public/static/login-bg.png";
import logo from "@/public/static/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/dashboard");
  };
  return (
    <div className="flex">
      {/* Login banner */}
      <div
        style={{ backgroundImage: `url(${loginBG.src})` }}
        className="h-screen flex flex-col bg-[#1C2536] items-center justify-center w-2/3 gap-2"
      >
        <span className="font-bold text-3xl text-white">
          Welcome to EVY TECHNO
        </span>
        <Image src={logo} className="h-60 w-auto" />
      </div>
      {/* Login Form */}
      <div className="w-1/3 flex flex-col items-center justify-center px-5">
        <PageTitle>Log In</PageTitle>
        <form className="w-full" onSubmit={handleSubmit}>
          <FormLayout>
            <Input name="username" placeholder="Enter Username" />
            <Input name="password" placeholder="Password" />
            <Button type="submit">Log In</Button>
          </FormLayout>
        </form>
      </div>
    </div>
  );
}
