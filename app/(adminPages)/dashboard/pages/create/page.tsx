"use client";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState(""); //Text editor content
  const [pageTitle, setPageTitle] = useState(""); //Text editor content
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(banner);
  };
  return (
    <div className="flex flex-col gap-10">
      {/* <PageTitle>Create a New Blog</PageTitle> */}
      <form className="flex flex-col gap-10">
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
                  // type="submit"
                  className="bg-[#6366F1]"
                >
                  Publish
                </Button>
                <Button className="bg-red-400/20 !text-red-800 ">Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
        {/* <BasicDetailsCard /> */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <FormLayout title="Basic Details">
              <Input name="name" placeholder="Page name" />
              <TextEditor
                placeholder="Page Title."
                value={pageTitle}
                onContentChange={setPageTitle}
                rows={6}
              />
            </FormLayout>
          </Card>{" "}
          {/* <PostCoverCard /> */}
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
              <Button className="bg-[#6366F1] w-fit">Upload</Button>
            </FormLayout>
          </Card>
        </div>
        {/* ContentCard  */}
        <Card>
          <FormLayout title="Description">
            <TextEditor
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
