"use client";
import Card from "@/app/ui/card/card";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

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

  //Text editor content

  return (
    <div className="flex flex-col gap-10">
      <PageTitle>Create a New Service</PageTitle>
      <form className="flex flex-col gap-10"></form>
      {/* Hello Admin Card  */}
      <Card>
        <div className="flex justify-between items-center">
          <span className="text-[20px] font-semibold">Hello Admin!!!</span>
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-[#1C2536] text-white font-semibold p-4 rounded-3xl"
            >
              Save
            </button>
            <button
              // type="submit"
              className="bg-[#6366F1] text-white font-semibold p-4 rounded-3xl"
            >
              Publish Now
            </button>
            <button className="bg-red-400/20 text-red-800 font-semibold p-4 rounded-3xl">
              Cancel
            </button>
          </div>
        </div>
      </Card>
      {/* <BasicDetailsCard /> */}
      <Card>
        <FormLayout title="Basic Details">
          <Input name="title" placeholder="Blog Title" />
          <TextEditor value={content} onContentChange={setContent} />
        </FormLayout>
      </Card>

      {/* <Icon and Banner /> */}
      <div className="flex gap-2">
        <Card>
          <FormLayout title="Icon ">
            <input
              type="file"
              name="icon"
              accept="image/"
              className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
              onChange={(e) => handleIconChange(e)}
            />
            {iconPreview && (
              <img src={iconPreview} alt="preview" height={100} width={100} />
            )}
            <button className="bg-[#6366F1] text-white font-semibold p-4 rounded-3xl w-fit">
              Upload
            </button>
          </FormLayout>
        </Card>
        <Card>
          <FormLayout title="Post Cover">
            <input
              type="file"
              name="banner"
              accept="image/"
              className="w-full border-2 border-[#E5E7EB] rounded-3xl p-3"
              onChange={(e) => handleFileChange(e)}
            />
            {preview && (
              <img src={preview} alt="preview" height={100} width={100} />
            )}
            <button className="bg-[#6366F1] text-white font-semibold p-4 rounded-3xl w-fit">
              Upload
            </button>
          </FormLayout>
        </Card>
      </div>
    </div>
  );
}
