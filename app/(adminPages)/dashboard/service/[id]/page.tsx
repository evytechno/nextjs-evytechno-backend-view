"use client";
import { uploadFile } from "@/app/API/upload.route";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";

import { use, useEffect, useState } from "react";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "./service.schema";
import { redirect } from "next/navigation";
import { fetchService, updateService } from "@/app/API/services.route";
import Swal from "sweetalert2";

type FormData = z.infer<typeof serviceSchema>;

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#000000");

  const [serviceData, setServiceData] = useState({});
  const serviceId = use(params).id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(banner);
  };
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
      setIconPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(icon);
  };

  const handleUpload = async (name: string) => {
    if ((!icon && name === "icon") || (!banner && name === "banner")) {
      return alert("Please select a file first!");
    }
    console.log(name);
    try {
      const formData = new FormData();
      if (name === "icon" && icon) {
        formData.append("file", icon);
      } else if (name === "banner" && banner) {
        formData.append("file", banner);
      }

      const uploadedImage = await uploadFile(formData);
      console.log(uploadedImage);
      if (name === "icon") {
        await setIconUrl(uploadedImage.file.url);
      } else if (name === "banner") {
        await setImageUrl(uploadedImage.file.url);
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
        description: content,

        is_published: String(isPublished),
        banner: imageUrl,
        icon: iconUrl,
        color1: color1,
        color2: color2,
      };
      console.log("FORMDATA", formData);
      const resp = await updateService(serviceId, JSON.stringify(formData));
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
    resolver: zodResolver(serviceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    async function getData(id: string) {
      console.log(id);
      const data = await fetchService(id);
      await setServiceData({ ...data.data });
      console.log("API DATA", data.data);
      console.log("FUNCT Service DATA", serviceData);
      reset({ ...data.data });
      setPreview(data.data.banner);
      setImageUrl(data.data.banner);
      setIconPreview(data.data.icon);
      setIconUrl(data.data.icon);
      setColor1(data.data.color1);
      setColor2(data.data.color2);
      setContent(data.data.description);
      setIsPublished(data.data.is_published);
    }
    getData(serviceId);
    console.log("servicedata", serviceData);
  }, [reset, serviceData, serviceId]);

  return (
    <div className="flex flex-col gap-10">
      {/* <PageTitle>Create a New Service</PageTitle> */}
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm hello-admin-card">
          <Card>
            <div className="flex justify-between items-center  ">
              <span className="text-[20px] font-semibold">
                Update your Service
              </span>
              <div className="flex gap-3">
                <Button type="submit" className="bg-[#1C2536]">
                  Save
                </Button>
                <Button
                  type="submit"
                  className="bg-[#6366F1]"
                  onClick={() => setIsPublished(true)}
                >
                  Publish
                </Button>
                <Button
                  type="button"
                  className="bg-red-400/20 !text-red-800 "
                  onClick={() => redirect(`/dashboard/service`)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
        {/* <BasicDetailsCard /> */}
        <Card>
          <FormLayout title="Basic Details">
            <Input
              {...register("name")}
              name="name"
              placeholder="Service Title"
              required={true}
              errors={errors}
            />
            <TextEditor
              name="description"
              placeholder="Description of the Service"
              value={content}
              onContentChange={setContent}
              rows={10}
            />
          </FormLayout>
        </Card>

        {/* <Icon and Banner /> */}
        <div className="flex gap-2">
          <Card>
            <FormLayout title="Icon ">
              <div className="flex gap-2 justify-between w-full ">
                <div className="grid grid-rows-2 gap-5 items-center w-full">
                  <input
                    placeholder="Upload Icon"
                    type="file"
                    name="icon"
                    accept="image/"
                    className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                    onChange={(e) => handleIconChange(e)}
                  />
                  <Button
                    type="button"
                    className="bg-[#6366F1] w-fit"
                    onClick={() => handleUpload("icon")}
                  >
                    Upload
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
                    placeholder="banner"
                    // {...register("banner")}
                    type="file"
                    name="banner"
                    accept="image/"
                    className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <Button
                    type="button"
                    className="bg-[#6366F1] w-fit"
                    onClick={() => handleUpload("banner")}
                  >
                    Upload
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
        {/* <Color for gradient picker /> */}
        <div className="flex gap-2">
          <Card>
            <FormLayout title="Color Picker for Gradient ">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  className="!p-0 !border-0 "
                  // {...register("color1")}
                  type="color"
                  name="color1"
                  placeholder="Color 1"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                />

                <Input
                  // {...register("color2")}
                  className="!p-0 !border-0 "
                  type="color"
                  name="color2"
                  placeholder="Color 2"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                />
              </div>
            </FormLayout>
          </Card>
        </div>
      </form>
    </div>
  );
}
