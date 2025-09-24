"use client";

import { useEffect, useState } from "react";
import AdminTable, { TypeTableHead } from "../../../ui/admin-table/admin-table";
import PageHeader from "../../../ui/page-header/page-header";
import { fetchBlog, fetchBlogList, updateBlog } from "@/app/API/blog.route";
import { Button } from "@/app/ui/buttons/button";
import { redirect } from "next/navigation";
import Image from "next/image";
import editIcon from "@/public/static/mingcute--edit-line.png";
import deleteIcon from "@/public/static/mingcute--delete-line.png";
import eyeIcon from "@/public/static/mingcute--eye-line.png";

import Swal from "sweetalert2";
import Modal from "@/app/ui/modal/modal";

import TableSkeleton from "@/app/ui/skeleton/table-skeleton";
type ModalData = {
  banner?: string;
  title?: string;
  category?: { name: string };
  content: string | TrustedHTML;
  // add other fields you need
};
type TableRow = {
  icon: string;
  banner: string;
  title: string;
  category: { name: string } | string;
  date_created: string;
  date_published: string;
  is_published: boolean;
  _id: string;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  async function getModalData(id: string) {
    const data = await fetchBlog(id);
    await setModalData({ ...data.data });
    setModalOpen(true);
  }
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const tableHead: TypeTableHead<TableRow>[] = [
    {
      key: "banner",
      label: "Image",
      render: (value) => {
        if (value && typeof value === "string") {
          return (
            <div className="flex items-center justify-center">
              <img
                src={value}
                className="h-25 w-25 object-cover rounded-md border-2 border-[#cccccc70]"
                alt="blog image"
              />
            </div>
          );
        }
        return <></>;
      },
    },
    {
      key: "title",
      label: "Blog Title",
      render: (value) => {
        // Render blog title with enhanced readability and error handling
        const title = value != null ? String(value) : "No title available";
        return <strong>{title}</strong>;
      },
    },
    {
      key: "category",
      label: "Category",
      render: (value) => {
        return (
          <span className="text-[#6C737F]">
            {typeof value === "object" && value !== null && "name" in value
              ? value.name
              : String(value)}
          </span>
        );
      },
    },
    {
      key: "date_created",
      label: "Date Created",
      render: (value) => {
        const d = new Date(String(value));
        return (
          <>{`${d.getDate()} ${d.toLocaleDateString("default", {
            month: "short",
          })}, ${d.getFullYear()}`}</>
        );
      },
    },
    {
      key: "date_published",
      label: "Publish On",
      render: (value) => {
        const d = new Date(String(value));
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
      render: (value) => {
        return (
          <span className=" font-semibold text-[12px]">
            {value && typeof value === "boolean" ? (
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
      render: (value) => {
        return (
          <div className="flex gap-2 items-center justify-center">
            <Button
              type="button"
              onClick={() => typeof value === "string" && getModalData(value)}
              className="bg-[#15a80d] !p-1 !rounded-lg"
            >
              <Image src={eyeIcon} alt="Edit" height={24} />
            </Button>
            <Button
              type="button"
              onClick={() => {
                typeof value === "string" &&
                  redirect(`/dashboard/blog/${value}`);
              }}
              className="bg-[#6366F1] !p-1 !rounded-lg"
            >
              <Image src={editIcon} alt="Edit" height={24} />
            </Button>
            <Button
              type="button"
              onClick={() => {
                typeof value === "string" && onDelete(value);
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

  // const tableDataStatic = [
  //   {
  //     id: "abdasdkajd",
  //     title: "ABCDEd",
  //     date_created: "2025-08-28T06:42:48.838+00:00",
  //     is_published: true,
  //     date_published: "2025-08-28T06:42:48.838+00:00",
  //     category: "SEO",
  //   },
  //   {
  //     id: "abdasdkajdasdasd",
  //     title: "ABCDEd",
  //     date_created: "2025-08-28T06:42:48.838+00:00",
  //     is_published: false,
  //     date_published: "2025-08-28T06:42:48.838+00:00",
  //     category: "SEO",
  //   },
  // ];
  async function getData() {
    setIsLoading(true);
    const blogList = await fetchBlogList();
    console.log(blogList);
    setTableData(blogList.data);
    setIsLoading(false);
  }

  const onDelete = async (blogId: string) => {
    const formData = { is_deleted: String(true) };
    console.log(blogId);

    try {
      await updateBlog(blogId, JSON.stringify(formData));

      const newTable = tableData.filter((blog: TableRow) => {
        return blog._id !== blogId;
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
      <PageHeader name="Blogs" addlink="./blog/create" />
      {isLoading ? (
        <TableSkeleton rows={4} tableHead={tableHead} />
      ) : tableData.length === 0 ? (
        <span>No Data</span>
      ) : (
        <AdminTable tableHead={tableHead} tableData={tableData} />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setModalData(null);
        }}
      >
        {modalData && (
          <div className="max-h-80vh overflow-y-auto space-y-4">
            <img
              alt="model image"
              src={modalData && modalData.banner}
              className="w-full h-auto"
            />
            <div className="text-3xl font-bold ">{modalData.title}</div>
            {modalData.category && (
              <span className="text-[#6C737F] text-sm">
                Category: {modalData.category.name}
              </span>
            )}
            <div
              className="prose mt-3 "
              dangerouslySetInnerHTML={{ __html: modalData.content }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
