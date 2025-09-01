"use client";

import Card from "@/app/(adminPages)/ui/card/card";
// import FIleInput from "@/app/(adminPages)/ui/form-elements/file-input";
import FormLayout from "@/app/(adminPages)/ui/form-elements/form-layout";
import Input from "@/app/(adminPages)/ui/form-elements/input";
import TextEditor from "@/app/(adminPages)/ui/form-elements/text-editor";
import PageTitle from "@/app/(adminPages)/ui/text-comp/pageTitle";
import { useState } from "react";

export default function Page() {
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(banner);
  };

  //components
  const HelloAdminCard = () => {
    return (
      <Card>
        <div className="flex justify-between items-center">
          <span className="text-[20px] font-semibold">Hello Admin!!!</span>
          <div className="flex gap-3">
            <button className="bg-[#1C2536] text-white font-semibold p-4 rounded-3xl">
              Save
            </button>
            <button className="bg-[#6366F1] text-white font-semibold p-4 rounded-3xl">
              Publish Now
            </button>
            <button className="bg-red-400/20 text-red-800 font-semibold p-4 rounded-3xl">
              Cancel
            </button>
          </div>
        </div>
      </Card>
    );
  };
  const BasicDetailsCard = () => {
    return (
      <Card>
        <FormLayout title="Basic Details">
          <Input name="title" placeholder="Blog Title" />
          <Input name="short_description" placeholder="Short Description" />
        </FormLayout>
      </Card>
    );
  };
  const PostCoverCard = () => {
    return (
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
    );
  };
  const ContentCard = () => {
    return (
      <Card>
        <FormLayout title="Content">
          <TextEditor value={content} onContentChange={setContent} />

          <div className="p-2 border rounded">
            <strong>Preview:</strong>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </FormLayout>
      </Card>
    );
  };
  const MetaCard = () => {
    return (
      <Card>
        <FormLayout title="Meta">
          <Input name="seo_title" placeholder="SEO Title" />
          <Input name="seo_description" placeholder="SEO Description" />
          <Input name="keywords" placeholder="Keywords" />
        </FormLayout>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <PageTitle>Create a New Blog</PageTitle>
      <form className="flex flex-col gap-10">
        <HelloAdminCard />
        <BasicDetailsCard />
        <PostCoverCard />
        <ContentCard />
        <MetaCard />
      </form>
    </div>
  );
}
