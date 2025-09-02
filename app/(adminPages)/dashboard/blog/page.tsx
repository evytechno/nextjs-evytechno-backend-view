"use client";

import { useEffect, useState } from "react";
import AdminTable from "../../../ui/admin-table/admin-table";
import PageHeader from "../../../ui/page-header/page-header";
import { fetchBlogList } from "@/app/API/blog.route";

export default function Page() {
  const [tableData, setTableData] = useState([]);
  const tableHead = [
    {
      key: "title",
      label: "Name",
      render: (value: string) => {
        return <span className="font-semibold">{value}</span>;
      },
    },
    {
      key: "category",
      label: "Category",
      render: (value: string) => {
        return <span className="text-[#6C737F]">{value}</span>;
      },
    },
    {
      key: "date_created",
      label: "Date Created",
      render: (value: string) => {
        const d = new Date(value);
        return `${d.getDate()} ${d.toLocaleDateString("default", {
          month: "short",
        })}, ${d.getFullYear()}`;
      },
    },
    {
      key: "date_published",
      label: "Publish On",
      render: (value: string) => {
        const d = new Date(value);
        return (
          <>
            {value !== null
              ? `${d.getDate()} ${d.toLocaleDateString("default", {
                  month: "short",
                })}, ${d.getFullYear()}`
              : "Will be published soon"}
          </>
        );
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
  ];

  const tableDataStatic = [
    {
      id: "abdasdkajd",
      title: "ABCDEd",
      date_created: "2025-08-28T06:42:48.838+00:00",
      is_published: true,
      date_published: "2025-08-28T06:42:48.838+00:00",
      category: "SEO",
    },
    {
      id: "abdasdkajdasdasd",
      title: "ABCDEd",
      date_created: "2025-08-28T06:42:48.838+00:00",
      is_published: false,
      date_published: "2025-08-28T06:42:48.838+00:00",
      category: "SEO",
    },
  ];
  async function getData() {
    const blogList = await fetchBlogList();
    console.log(blogList);
    setTableData(blogList.data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Blogs" addlink="./blog/create" />
      {tableData === [] ? (
        <span>No Data</span>
      ) : (
        <AdminTable tableHead={tableHead} tableData={tableData} />
      )}
    </div>
  );
}
