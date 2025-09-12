"use client";

import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";

import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";

import { createBlog } from "@/app/API/blog.route";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { Button } from "@/app/ui/buttons/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "./blog.schema";
import { fetchServiceList } from "@/app/API/services.route";
import { redirect } from "next/navigation";
import { uploadFile } from "@/app/API/upload.route";

type FormData = z.infer<typeof blogSchema>;

export default function Page() {
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [category, setCategory] = useState("");

  const [options, setOptions] = useState([]);
  const [content, setContent] = useState(""); //Text editor content}
  const [isPublished, setIsPublished] = useState<boolean>(false);

  //Functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  ///upload image
  const handleUpload = async () => {
    if (!banner) return alert("Please select a Image first!");

    const formData = new FormData();
    formData.append("file", banner);

    try {
      const uploadedImage = await uploadFile(formData);
      console.log(uploadedImage);
      await setImageUrl(uploadedImage.file.url);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e: object) => {
    try {
      if (isPublished) {
        e = { ...e, date_published: new Date().toISOString() };
      }
      const formData = {
        ...e,
        content: content,
        author: "68aee2860a6fba8d64ce8fda",
        is_published: String(isPublished),
        banner: imageUrl,
        category: category,
      };
      console.log("FORMDATA", formData);

      const resp = await createBlog(JSON.stringify(formData));
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
    resolver: zodResolver(blogSchema),
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
      {/* <PageTitle>Create a New Blog</PageTitle> */}
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm hello-admin-card">
          <Card>
            <div className="flex justify-between items-center  ">
              <span className="text-[20px] font-semibold">
                Create a New Blog
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
                  onClick={() => redirect(`/dashboard/blog`)}
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
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("title")}
                name="title"
                placeholder="Blog Title"
                required={true}
                errors={errors}
              />

              <DropDown
                // {...register("category")}
                name="category"
                placeholder="Select a category for the Blog"
                options={options}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <Input
              {...register("short_description")}
              name="short_description"
              placeholder="Short Description"
              required={true}
              errors={errors}
            />
          </FormLayout>
        </Card>

        {/* <PostCoverCard /> */}
        <Card>
          <FormLayout title="Post Cover">
            <div className="flex gap-2 justify-between w-full ">
              <div className="grid grid-rows-2 gap-5 items-center w-full">
                <input
                  // {...register("banner")}
                  type="file"
                  name="banner"
                  accept="image/"
                  className={
                    "w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
                    // (errors && errors["banner"] ? " border-red-500" : "")
                  }
                  onChange={(e) => handleFileChange(e)}
                />
                <Button
                  type="button"
                  className="bg-[#6366F1] w-fit"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </div>
              {preview && (
                <img src={preview} alt="preview" height={100} width={100} />
              )}
              {/* {errors && errors["banner"] && errors["banner"].message && (
                <p className="text-red-500">{errors["banner"].message}</p>
              )} */}
            </div>
          </FormLayout>
        </Card>

        {/* ContentCard  */}
        <Card>
          <FormLayout title="Content">
            <TextEditor
              // {...register("content")}
              placeholder="Blog Content Starts here..."
              value={content}
              onContentChange={setContent}
              rows={10}
              name="content"
              required={true}
            />

            {/* <div className="p-2 border rounded">
              <strong>Preview:</strong>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div> */}
          </FormLayout>
        </Card>

        {/* <MetaCard /> */}
        <Card>
          <FormLayout title="Meta">
            <div className="grid grid-cols-2 gap-4">
              <Input
                {...register("seo_title")}
                name="seo_title"
                placeholder="SEO Title"
                errors={errors}
              />
              <Input
                {...register("keywords")}
                name="keywords"
                placeholder="Keywords"
                errors={errors}
              />
            </div>
            <Input
              {...register("seo_description")}
              name="seo_description"
              placeholder="SEO Description"
              errors={errors}
            />
          </FormLayout>
        </Card>
      </form>
    </div>
  );
}
