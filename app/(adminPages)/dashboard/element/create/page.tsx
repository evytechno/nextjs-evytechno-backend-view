"use client";

import { createElement } from "@/app/API/element.route";
import { fetchServiceList } from "@/app/API/services.route";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";

import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import { elementSchema } from "./element.schema";

import { uploadFile } from "@/app/API/upload.route";

type FormData = z.infer<typeof elementSchema>;

export default function Page() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [options, setOptions] = useState([]);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const [service, setService] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(image);
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
      setIconPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(icon);
  };

  ///upload image
  const handleUpload = async (name: string) => {
    if (!icon && !image) return alert("Please select a file first!");

    try {
      const formData = new FormData();
      if (name === "icon" && icon) {
        formData.append("file", icon);
      } else if (name === "image" && image) {
        formData.append("file", image);
      }

      const uploadedImage = await uploadFile(formData);
      console.log(uploadedImage);
      if (name === "icon") {
        await setIconUrl(uploadedImage.file.url);
      } else if (name === "image") {
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
        title: title,
        is_published: String(isPublished),
        image: imageUrl,
        icon: iconUrl,
        service: service,
      };
      console.log("FORMDATA", formData);
      const resp = await createElement(JSON.stringify(formData));
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(elementSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    async function getServices() {
      const servicesData = await fetchServiceList();
      console.log(servicesData);
      setOptions(servicesData.data);
    }
    getServices();
  }, []);
  return (
    <div className="flex flex-col gap-10">
      {/* <PageTitle>Create a New Element</PageTitle> */}
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm hello-admin-card">
          <Card>
            <div className="flex justify-between items-center  ">
              <span className="text-[20px] font-semibold">
                Create a New Element
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
                  onClick={() => redirect(`/dashboard/element`)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
        {/* <BasicDetailsCard /> */}
        <div className="flex gap-2">
          <Card>
            <FormLayout title="Basic Details">
              <Input
                {...register("name")}
                name="name"
                placeholder="Element name"
                required={true}
                errors={errors}
              />

              <DropDown
                // {...register("service")}
                name="service"
                placeholder="Service to which the element belongs"
                options={options}
                errors={errors}
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
              <TextEditor
                // {...register("title")}
                name="title"
                value={title}
                placeholder="Title of Element"
                onContentChange={setTitle}
                rows={6}
                required={true}
                errors={errors}
              />
            </FormLayout>
          </Card>

          <Card>
            <FormLayout title="Image and Icon ">
              <div className="flex gap-2 justify-between w-full ">
                <div className="grid grid-rows-2 gap-5 items-center w-full">
                  <input
                    // {...register("image")}
                    type="file"
                    name="image"
                    accept="image/"
                    className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                    onChange={(e) => handleImageChange(e)}
                    placeholder="Choose the SUitable Image"
                  />
                  <Button
                    type="button"
                    className="bg-[#6366F1] w-fit"
                    onClick={() => handleUpload("image")}
                  >
                    Image Upload
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
              <div className="flex gap-2 justify-between w-full">
                <div className="grid grid-rows-2 gap-5 items-center w-full">
                  <input
                    // {...register("icon")}
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
                    Icon Upload
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
        </div>
        <Card>
          <FormLayout title="Title and Description">
            <TextEditor
              // {...register("description")}
              name="description"
              value={content}
              placeholder="Description of Element"
              onContentChange={setContent}
              rows={8}
              required={true}
              errors={errors}
            />
          </FormLayout>
        </Card>
      </form>
    </div>
  );
}
