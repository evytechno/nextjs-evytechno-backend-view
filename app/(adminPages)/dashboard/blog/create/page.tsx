"use client";

import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";

import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import PageTitle from "@/app/ui/text-comp/pageTitle";
import { createBlog } from "@/app/API/blog.route";
import { toBase64 } from "@/app/utils/helpers/index";

import { useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const [banner, setBanner] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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
  const [content, setContent] = useState(""); //Text editor content

  //Functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
    console.log(banner);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    formData.append("content", content);
    formData.append("author", "68aee2860a6fba8d64ce8fda");

    if (banner) {
      const base64Image = await toBase64(banner);
      formData.append("banner", base64Image);
    }
    try {
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

  //components
  const HelloAdminCard = () => {
    return (
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
    );
  };
  const BasicDetailsCard = () => {
    return (
      <Card>
        <FormLayout title="Basic Details">
          <Input name="title" placeholder="Blog Title" />
          <Input name="short_description" placeholder="Short Description" />
          <DropDown
            name="category"
            placeholder="Select a category for the Blog"
            options={options}
          />
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
          <TextEditor
            placeholder="Blog Content Here"
            value={content}
            onContentChange={setContent}
          />

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
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
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
            <Input name="short_description" placeholder="Short Description" />
            <DropDown
              name="category"
              placeholder="Select a category for the Blog"
              options={options}
            />
          </FormLayout>
        </Card>

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
            <button className="bg-[#6366F1] text-white font-semibold p-4 rounded-3xl w-fit">
              Upload
            </button>
          </FormLayout>
        </Card>

        {/* ContentCard  */}
        <Card>
          <FormLayout title="Content">
            <TextEditor
              placeholder="Blog Content Starts here..."
              value={content}
              onContentChange={setContent}
            />

            <div className="p-2 border rounded">
              <strong>Preview:</strong>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </FormLayout>
        </Card>

        {/* <MetaCard /> */}
        <Card>
          <FormLayout title="Meta">
            <Input name="seo_title" placeholder="SEO Title" />
            <Input name="seo_description" placeholder="SEO Description" />
            <Input name="keywords" placeholder="Keywords" />
          </FormLayout>
        </Card>
      </form>
    </div>
  );
}
