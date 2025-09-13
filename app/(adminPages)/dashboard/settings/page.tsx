"use client";
import { uploadFile } from "@/app/API/upload.route";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";

import { useEffect, useState } from "react";
import { settingsSchema } from "./settings.schema";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchSettings, updateSettings } from "@/app/API/settings.route";
import Swal from "sweetalert2";

type FormData = z.infer<typeof settingsSchema>;

export default function Page() {
  const [logo, setLogo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");

  const [mobile, setMobile] = useState<number>();

  const [settingsData, setSettingsData] = useState({});
  const [settingsId, setSettingsId] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(logo);
  };
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
      setIconPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(icon);
  };

  const handleUpload = async (name: string) => {
    if (!icon && !logo) return alert("Please select a file first!");
    console.log(name);
    try {
      const formData = new FormData();
      if (name === "icon" && icon) {
        formData.append("file", icon);
      } else if (name === "logo" && logo) {
        formData.append("file", logo);
      }

      const uploadedImage = await uploadFile(formData);
      console.log(uploadedImage);
      if (name === "icon") {
        await setIconUrl(uploadedImage.file.url);
      } else if (name === "logo") {
        await setLogoUrl(uploadedImage.file.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e: object) => {
    console.log("data.....", e);
    console.log(e);

    try {
      const formData = {
        ...e,
        email: email,
        mobile: Number(mobile),
        logo: logoUrl,
        favicon: iconUrl,
      };
      console.log("FORMDATA", formData);
      const resp = await updateSettings(settingsId, JSON.stringify(formData));
      Swal.fire({
        text: resp.message,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(settingsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    async function getData() {
      const data = await fetchSettings();
      await setSettingsData({ ...data.data });
      console.log("API DATA", data.data);
      console.log("FUNCT Service DATA", settingsData);
      reset({ ...data.data });
      setPreview(data.data.logo);
      setLogoUrl(data.data.logo);
      setIconPreview(data.data.favicon);
      setIconUrl(data.data.favicon);
      setSettingsId(data.data._id);
      setEmail(data.data.email);
      setMobile(Number(data.data.mobile));
    }
    getData();
    console.log("settingsData", settingsData);
  }, [reset, settingsData]);
  return (
    <div className="flex flex-col gap-10">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm hello-admin-card">
          <Card>
            <div className="flex justify-between items-center  ">
              <span className="text-[20px] font-semibold">Settings</span>
              <div className="flex gap-3">
                <Button type="submit" className="bg-[#1C2536]">
                  Save
                </Button>
                {/* <Button
                  type="submit"
                  className="bg-[#6366F1]"
                  onClick={() => setIsPublished(true)}
                >
                  Publish
                </Button> */}
                {/* <Button
                  type="button"
                  className="bg-red-400/20 !text-red-800 "
                  onClick={() => redirect(`/dashboard/element`)}
                >
                  Cancel
                </Button> */}
              </div>
            </div>
          </Card>
        </div>
        {/* Details */}
        <Card>
          <FormLayout title="Contact Details">
            <Input
              {...register("title")}
              name="title"
              placeholder="Title"
              required={true}
              errors={errors}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("email")}
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E Mail"
                errors={errors}
              />
              <Input
                // {...register("mobile")}
                type="text"
                name="mobile"
                placeholder="Mobile"
                maxLength={10}
                value={mobile}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMobile(Number(e.target.value))
                }
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(
                    /[^0-9]/g,
                    ""
                  );
                }}
                errors={errors}
              />
            </div>
          </FormLayout>
        </Card>
        {/* <Logo and FavIcon /> */}
        <div className="flex gap-2">
          <Card>
            <FormLayout title="FavIcon ">
              <div className="flex gap-2 justify-between w-full ">
                <div className="grid grid-rows-2 gap-5 items-center w-full">
                  <input
                    placeholder="Upload Favicon"
                    // {...register("icon")}
                    type="file"
                    name="favicon"
                    accept="image/"
                    className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                    onChange={(e) => handleIconChange(e)}
                  />
                  <Button
                    type="button"
                    className="bg-[#6366F1] w-fit"
                    onClick={() => handleUpload("icon")}
                  >
                    Upload Favicon
                  </Button>
                </div>
                {iconPreview && (
                  <img
                    src={iconPreview}
                    alt="preview"
                    height={100}
                    width={100}
                    className="h-[100px] w-auto"
                  />
                )}
              </div>
            </FormLayout>
          </Card>
          <Card>
            <FormLayout title="Post Cover">
              <div className="flex gap-2 justify-between w-full ">
                <div className="grid grid-rows-2 gap-5 items-center w-full">
                  <input
                    placeholder="Upload Logo"
                    // {...register("logo")}
                    type="file"
                    name="logo"
                    accept="image/"
                    className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <Button
                    type="button"
                    className="bg-[#6366F1] w-fit"
                    onClick={() => handleUpload("logo")}
                  >
                    Upload Logo
                  </Button>
                </div>
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    height={100}
                    width={100}
                    className="h-[100px] w-auto"
                  />
                )}
              </div>
            </FormLayout>
          </Card>
        </div>
      </form>
    </div>
  );
}
