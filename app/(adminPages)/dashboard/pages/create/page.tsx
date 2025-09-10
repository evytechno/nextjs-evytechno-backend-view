"use client";
import { createPage } from "@/app/API/pages.route";
import { uploadFile } from "@/app/API/upload.route";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import { redirect } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { PageSchema } from "./pages.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

type FormData = z.infer<typeof PageSchema>;

export default function Page() {
  const [content, setContent] = useState(""); //Text editor content
  const [pageTitle, setPageTitle] = useState(""); //Text editor content
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(image);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select a Image first!");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const uploadedImage = await uploadFile(formData);
      console.log(uploadedImage);
      await setImageUrl(uploadedImage.file.url);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    try {
      const formData = {
        ...e,

        is_published: String(isPublished),
        image: imageUrl,
        title: pageTitle,
        description: content,
      };
      console.log("FORMDATA", formData);

      const resp = await createPage(JSON.stringify(formData));
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
    resolver: zodResolver(PageSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div className="flex flex-col gap-10">
      {/* <PageTitle>Create a New Blog</PageTitle> */}
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm">
          <Card>
            <div className="flex justify-between items-center  ">
              <span className="text-[20px] font-semibold">
                Create a New Page
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
                  onClick={() => redirect(`/dashboard/pages`)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
        {/* <BasicDetailsCard /> */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <FormLayout title="Basic Details">
              <Input
                {...register("name")}
                name="name"
                placeholder="Page name"
                required={true}
                errors={errors}
              />
              <TextEditor
                {...register("title")}
                name="title"
                placeholder="Page Title."
                value={pageTitle}
                onContentChange={setPageTitle}
                rows={6}
              />
            </FormLayout>
          </Card>{" "}
          {/* <PostCoverCard /> */}
          <Card>
            <FormLayout title="Page Image">
              <div className="flex gap-2 justify-between w-full ">
                <div className="grid grid-rows-2 gap-5 items-center w-full">
                  <input
                    type="file"
                    {...register("image")}
                    name="image"
                    accept="image/"
                    className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
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
              </div>
            </FormLayout>
          </Card>
        </div>
        {/* ContentCard  */}
        <Card>
          <FormLayout title="Description">
            <TextEditor
              {...register("description")}
              name="description"
              placeholder="Page Description Starts here..."
              value={content}
              onContentChange={setContent}
              rows={10}
            />
          </FormLayout>
        </Card>
      </form>
    </div>
  );
}
