"use client";

import { fetchServiceList } from "@/app/API/services.route";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import { useEffect, useState } from "react";

export default function Page() {
  const [startType, setStartType] = useState<"text" | "date">("text");
  const [startDate, setStartDate] = useState("");
  const [endType, setEndType] = useState<"text" | "date">("text");
  const [endDate, setEndDate] = useState("");

  const [content, setContent] = useState("");

  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [options, setOptions] = useState([]);

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
      <form className="flex flex-col gap-10">
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm">
          <Card>
            <div className="flex justify-between items-center  ">
              <span className="text-[20px] font-semibold">
                Create a Case Study
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

        {/* Basic Details */}

        <Card>
          <FormLayout title="Basic Details">
            <div className="grid grid-cols-2 gap-4">
              <Input
                // {...register("name")}
                name="name"
                placeholder="Case Name"
                required={true}
                // errors={errors}
              />

              <DropDown
                // {...register("category")}
                name="category"
                placeholder="Select a category for the Case"
                options={options}
              />
            </div>
            <Input
              // {...register("name")}
              name="skills"
              placeholder="Skills used"
              required={true}
              // errors={errors}
            />
          </FormLayout>
        </Card>
        {/* Start Date and End Date  */}
        <Card>
          <FormLayout title="Start and End Date">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type={startType}
                name="start_date"
                placeholder="Start Date"
                onFocus={() => setStartType("date")}
                onBlur={() => {
                  if (!startDate) setStartType("text"); // reset back if empty
                }}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <Input
                type={endType}
                name="end_date"
                placeholder="End Date"
                onFocus={() => setEndType("date")}
                onBlur={() => {
                  if (!endDate) setEndType("text"); // reset back if empty
                }}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </FormLayout>
        </Card>

        {/* Case Details  */}

        <Card>
          <FormLayout title="Case Details">
            <TextEditor
              //   {...register("description")}
              placeholder="Blog Content Starts here..."
              value={content}
              onContentChange={setContent}
              rows={10}
              name="description"
              required={true}
            />
          </FormLayout>
        </Card>
      </form>
    </div>
  );
}
