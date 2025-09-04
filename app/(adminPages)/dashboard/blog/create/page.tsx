"use client";

import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";

import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import { createBlog } from "@/app/API/blog.route";
import { convertToFormData, toBase64 } from "@/app/utils/helpers/index";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { Button } from "@/app/ui/buttons/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema } from "./blog.schema";
import { fetchServiceList } from "@/app/API/services.route";

type FormData = z.infer<typeof blogSchema>;

export default function Page() {
  const [banner, setBanner] = useState<File | null>(null);
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
  const [content, setContent] = useState(""); //Text editor content}
  const [isPublished, setIsPublished] = useState<boolean>(false);

  //Functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(banner);
  };

  const onSubmit = async (e) => {
    // e.preventDefault;
    // const formData = new FormData(e.target as HTMLFormElement);
    const formData = convertToFormData(e);
    console.log("FORMDATA", formData);

    formData.append("content", content);
    formData.append("author", "68aee2860a6fba8d64ce8fda");
    formData.append("is_published", String(isPublished));

    if (banner) {
      const base64Image = await toBase64(banner);
      formData.append("banner", base64Image);
    }
    try {
      // console.log(isPublished);
      if (isPublished === true) {
        formData.append("date_published", new Date().toISOString());
      }
      const resp = await createBlog(formData);
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
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm">
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
                <Button className="bg-red-400/20 !text-red-800 ">Cancel</Button>
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
                {...register("category")}
                name="category"
                placeholder="Select a category for the Blog"
                options={options}
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
            <input
              {...register("banner")}
              type="file"
              name="banner"
              accept="image/"
              className={
                "w-full border-2 border-[#E5E7EB] rounded-3xl p-3" +
                (errors && errors["banner"] ? " border-red-500" : "")
              }
              onChange={(e) => handleFileChange(e)}
            />
            {preview && (
              <img src={preview} alt="preview" height={100} width={100} />
            )}
            {/* <Button className="bg-[#6366F1] w-fit">Upload</Button> */}
            {errors && errors["banner"] && errors["banner"].message && (
              <p className="text-red-500">{errors["banner"].message}</p>
            )}
          </FormLayout>
        </Card>

        {/* ContentCard  */}
        <Card>
          <FormLayout title="Content">
            <TextEditor
              {...register("content")}
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
