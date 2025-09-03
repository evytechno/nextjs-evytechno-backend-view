"use client";

import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const [options, setOptions] = useState([
    {
      _id: "68ac4ccaf6405d14145c26be",
      name: "Web Dev",
    },
    {
      _id: "68ac4cf5f6405d14145c26c2",
      name: "SEO",
    },
    {
      _id: "68ac4d6c451cbebaa7a25da6",
      name: "App Dev",
    },
  ]);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0]);
      setIconPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(icon);
  };
  return (
    <div className="flex flex-col gap-10">
      {/* <PageTitle>Create a New Element</PageTitle> */}
      <form className="flex flex-col gap-10">
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm">
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
        <div className="flex gap-2">
          <Card>
            <FormLayout title="Basic Details">
              <Input name="name" placeholder="Element name" />

              <DropDown
                name="service"
                placeholder="Service to which the element belongs"
                options={options}
              />
            </FormLayout>
          </Card>

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
        </div>
        <Card>
          <FormLayout title="Description">
            <TextEditor
              value={content}
              placeholder="Description of Element"
              onContentChange={setContent}
              rows={8}
            />
          </FormLayout>
        </Card>
      </form>
    </div>
  );
}
