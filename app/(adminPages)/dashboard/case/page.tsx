"use client";

import { useEffect, useState } from "react";
import AdminTable from "../../../ui/admin-table/admin-table";
import PageHeader from "../../../ui/page-header/page-header";

import { Button } from "@/app/ui/buttons/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import editIcon from "@/public/static/mingcute--edit-line.png";
import deleteIcon from "@/public/static/mingcute--delete-line.png";
import Swal from "sweetalert2";
import { fetchCaseList, updateCase } from "@/app/API/case.route";

export default function Page() {
  const [tableData, setTableData] = useState([]);
  const [category, setCategory] = useState("");
  const tableHead = [
    {
      key: "name",
      label: "Case Title",
      render: (value: string) => {
        return <span className="font-semibold">{value}</span>;
      },
    },
    {
      key: "category",
      label: "Category",
      render: (value) => {
        return (
          <span className="text-[#6C737F]">{value ? value.name : "-"}</span>
        );
      },
    },
    {
      key: "start_date",
      label: "Start Date",
      render: (value: string) => {
        const d = new Date(value);
        return value
          ? `${d.getDate()} ${d.toLocaleDateString("default", {
              month: "short",
            })}, ${d.getFullYear()}`
          : "-";
      },
    },
    {
      key: "end_date",
      label: "End Date",
      render: (value: string) => {
        const d = new Date(value);
        return value
          ? `${d.getDate()} ${d.toLocaleDateString("default", {
              month: "short",
            })}, ${d.getFullYear()}`
          : "-";
      },
    },

    {
      key: "is_published",
      label: "Status",
      render: (value: boolean) => {
        return (
          <span className=" font-semibold text-[12px]">
            {value ? (
              <span className="text-[#0B815A] bg-[#10B9811F] p-2 rounded-full">
                Published
              </span>
            ) : (
              <span className="text-[#0E7090] bg-[#06AED41F] p-2 rounded-full">
                Draft
              </span>
            )}
          </span>
        );
      },
    },
    {
      key: "_id",
      label: "Actions",
      render: (value: string) => {
        return (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => {
                redirect(`/dashboard/case/${value}`);
              }}
              className="bg-[#6366F1] !p-1 !rounded-lg"
            >
              <Image src={editIcon} alt="Edit" height={24} />
            </Button>
            <Button
              type="button"
              onClick={() => {
                onDelete(value);
              }}
              className="bg-[#AF2B0D] !p-1 !rounded-lg"
            >
              <Image src={deleteIcon} alt="Delete" height={24} />
            </Button>
          </div>
        );
      },
    },
  ];

  const tableDataStatic = [
    {
      id: "abdasdkajd",
      name: "ABCDEd",
      start_date: "2025-08-28T06:42:48.838+00:00",
      is_published: true,

      category: "SEO",
    },
    {
      id: "abdasdkajdasdasd",
      name: "ABCDEd",
      start_date: "2025-08-28T06:42:48.838+00:00",
      is_published: false,

      category: "SEO",
    },
  ];
  async function getData() {
    const caseList = await fetchCaseList(category);
    console.log(caseList);
    setTableData(caseList.data);
  }

  const onDelete = async (caseId: string) => {
    const formData = { is_deleted: String(true) };
    console.log(caseId);

    try {
      const resp = await updateCase(caseId, JSON.stringify(formData));

      const newTable = tableData.filter((item) => {
        return item._id !== caseId;
      });
      setTableData([...newTable]);
      Swal.fire({
        title: "Deleted",
        text: "Blog Deleted Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Case Studies" addlink="./case/create" />
      {tableData.length === 0 ? (
        <span>No Data</span>
      ) : (
        <AdminTable tableHead={tableHead} tableData={tableData} />
      )}
      {/* <AdminTable tableHead={tableHead} tableData={tableDataStatic} /> */}
    </div>
  );
}
