"use client";

import { fetchServiceList } from "@/app/API/services.route";
import { Button } from "@/app/ui/buttons/button";
import Card from "@/app/ui/card/card";
import DropDown from "@/app/ui/form-elements/dropdown";
import FormLayout from "@/app/ui/form-elements/form-layout";
import Input from "@/app/ui/form-elements/input";
import TextEditor from "@/app/ui/form-elements/text-editor";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { caseSchena } from "./case.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import { createCase } from "@/app/API/case.route";
import { redirect } from "next/navigation";

type FormData = z.infer<typeof caseSchena>;

export default function Page() {
  const [startType, setStartType] = useState<"text" | "date">("text");
  const [startDate, setStartDate] = useState("");
  const [endType, setEndType] = useState<"text" | "date">("text");
  const [endDate, setEndDate] = useState("");

  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [options, setOptions] = useState([]);

  const onSubmit = async (e) => {
    console.log("data.....", e);
    console.log(e);

    try {
      const formData = {
        ...e,
        description: content,

        is_published: String(isPublished),
        start_date: startDate,
        end_date: endDate,
        category: category,
      };
      console.log("FORMDATA", formData);
      const resp = await createCase(JSON.stringify(formData));
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
    resolver: zodResolver(caseSchena),
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
      <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Hello Admin Card  */}
        <div className="sticky top-19 bg-white/20 backdrop-blur-sm hello-admin-card">
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
                  onClick={() => redirect(`/dashboard/case`)}
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
                {...register("name")}
                name="name"
                placeholder="Case Name"
                required={true}
                errors={errors}
              />

              <DropDown
                // {...register("category")}
                name="category"
                placeholder="Select a category for the Case"
                options={options}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <Input
              {...register("skills")}
              name="skills"
              placeholder="Skills used"
              // required={true}
              // errors={errors}
            />
          </FormLayout>
        </Card>
        {/* Start Date and End Date  */}
        <Card>
          <FormLayout title="Start and End Date">
            <div className="grid grid-cols-2 gap-4">
              <Input
                // {...register("start_date")}
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
                // {...register("end_date")}
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
              // {...register("description")}
              placeholder="Case Content Starts here..."
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
