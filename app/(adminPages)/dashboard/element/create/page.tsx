"use client";

import { createElement } from "@/app/API/element.route";
import { fetchServiceList } from "@/app/API/services.route";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import { convertToFormData, toBase64 } from "@/app/utils/helpers";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
import { elementSchema } from "./element.schema";
import { describe } from "node:test";

type FormData = z.infer<typeof elementSchema>;

export default function Page() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [options, setOptions] = useState([
    // {
    //   _id: "68ac4ccaf6405d14145c26be",
    //   name: "Web Dev",
    // },
    // {
    //   _id: "68ac4cf5f6405d14145c26c2",
    //   name: "SEO",
    // },
    // {
    //   _id: "68ac4d6c451cbebaa7a25da6",
    //   name: "App Dev",
    // },
  ]);
  const [isPublished, setIsPublished] = useState<boolean>(false);

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

  const onSubmit = async (e) => {
    console.log("data.....", e);
    console.log(e);
    // e.preventDefault;
    // const formData = new FormData(e.target as HTMLFormElement);
    const formData = convertToFormData(e);
    console.log("FORMDATA", formData);

    formData.append("description", content);
    formData.append("title", title);
    formData.append("is_published", String(isPublished));

    const data = {
      name: e.name,
      description: content,
      title: title,
      is_published: isPublished,
    };

    if (icon) {
      // const base64Image = await toBase64(icon);
      formData.append("icon", icon);
    }
    if (image) {
      // const base64Image = await toBase64(image);
      formData.append("image", image);
    }
    try {
      // console.log(isPublished);
      if (isPublished === true) {
        formData.append("date_published", new Date().toISOString());
      }
      const resp = await createElement(JSON.stringify(data));
      Swal.fire({
        title: resp.succcess,
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
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm">
          {console.log(errors)}
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
                {...register("service")}
                name="service"
                placeholder="Service to which the element belongs"
                options={options}
                errors={errors}
              />
            </FormLayout>
          </Card>

          <Card>
            <FormLayout title="Image and Icon ">
              <input
                {...register("image")}
                type="file"
                name="image"
                accept="image/"
                className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                onChange={(e) => handleImageChange(e)}
                placeholder="Choose the SUitable Image"
              />
              {preview && (
                <img src={preview} alt="preview" height={100} width={100} />
              )}
              <input
                {...register("icon")}
                type="file"
                name="icon"
                accept="image/"
                className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                onChange={(e) => handleIconChange(e)}
              />
              {iconPreview && (
                <img src={iconPreview} alt="preview" height={100} width={100} />
              )}
              {/* <button className="bg-[#6366F1] text-white font-semibold p-4 rounded-3xl w-fit">
                Upload
              </button> */}
            </FormLayout>
          </Card>
        </div>
        <Card>
          <FormLayout title="Title and Description">
            <TextEditor
              {...register("title")}
              value={title}
              placeholder="Title of Element"
              onContentChange={setTitle}
              rows={4}
              required={true}
              errors={errors}
            />

            <TextEditor
              {...register("description")}
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
