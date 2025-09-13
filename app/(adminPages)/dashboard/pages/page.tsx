"use client";
import AdminTable, { TypeTableHead } from "@/app/ui/admin-table/admin-table";
import { Button } from "@/app/ui/buttons/button";
import PageHeader from "@/app/ui/page-header/page-header";
import Image from "next/image";
import editIcon from "@/public/static/mingcute--edit-line.png";
import deleteIcon from "@/public/static/mingcute--delete-line.png";
import eyeIcon from "@/public/static/mingcute--eye-line.png";

import { redirect } from "next/navigation";
import { fetchPage, fetchPageList, updatePage } from "@/app/API/pages.route";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Modal from "@/app/ui/modal/modal";
import TableSkeleton from "@/app/ui/skeleton/table-skeleton";

type ModalData = {
  image?: string;
  title: string | TrustedHTML;
  name?: string;

  description: string | TrustedHTML;
  // add other fields you need
};

type TableRow = {
  name: string;
  title: string;
  description: string;

  is_published: boolean;
  _id: string;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  async function getModalData(id: string) {
    const data = await fetchPage(id);
    await setModalData({ ...data.data });
    setModalOpen(true);
  }
  const [tableData, setTableData] = useState<TableRow[]>([]);

  const tableHead: TypeTableHead<TableRow>[] = [
    {
      key: "name",
      label: "Name",
      render: (value) => {
        return (
          <span className="font-semibold">
            {value !== null ? String(value) : "-"}
          </span>
        );
      },
    },
    {
      key: "title",
      label: "Title",
      render: (value) => {
        return (
          <div
            className="prose text-md line-clamp-2"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        );
      },
    },
    {
      key: "description",
      label: "Description",
      render: (value) => {
        return (
          <div
            className="prose text-sm line-clamp-2"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        );
      },
    },

    {
      key: "is_published",
      label: "Status",
      render: (value) => {
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
      render: (value) => {
        return (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => {
                if (typeof value === "string") {
                  getModalData(value);
                }
              }}
              className="bg-[#15a80d] !p-1 !rounded-lg"
            >
              <Image src={eyeIcon} alt="Edit" height={24} />
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (typeof value === "string") {
                  redirect(`/dashboard/pages/${value}`);
                }
              }}
              className="bg-[#6366F1] !p-1 !rounded-lg"
            >
              <Image src={editIcon} alt="Edit" height={24} />
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (typeof value === "string") {
                  onDelete(value);
                }
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

  async function getData() {
    setIsLoading(true);
    const pageList = await fetchPageList();
    console.log(pageList);
    setTableData(pageList.data);
    setIsLoading(false);
  }

  const onDelete = async (pageId: string) => {
    const formData = { is_deleted: String(true) };
    console.log(pageId);

    try {
      await updatePage(pageId, JSON.stringify(formData));

      const newTable = tableData.filter((page) => {
        return page._id !== pageId;
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

  // const tableDataStatic = [
  //   {
  //     _id: "68ac4ccaf6405d14145c26be",
  //     name: "About",
  //     title: "Innovate. Create. Dominate– The Evy Techno Way",
  //     description:
  //       "At Evy Techno Where Creativity Meets Algorithms, we are a dynamic team of innovators, strategists, and tech enthusiasts dedicated to transforming businesses through cutting-edge digital solutions. With expertise in web development, app development, graphic designing, search engine optimization (SEO), and digital marketing, we help brands establish a powerful online presence and stay ahead in the digital era. Our mission is to craft intuitive, high-performance websites and applications that drive engagement and growth. Whether you need a stunning website, a feature-rich mobile app, or a robust digital marketing strategy, Evy Techno ensures top-tier solutions tailored to your needs. We believe in innovation, creativity, and result-driven strategies, making us the trusted technology partner for startups, enterprises, and growing businesses. Let’s build something extraordinary together!",
  //     image: "./abc/cd.png",
  //   },
  // ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Pages" addlink="./pages/create" />
      {isLoading ? (
        <TableSkeleton tableHead={tableHead} rows={4} />
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
            {modalData.image && (
              <img
                src={modalData.image}
                className="w-full h-auto"
                alt="modal image"
              />
            )}
            <div
              className="prose text-3xl font-bold "
              dangerouslySetInnerHTML={{ __html: modalData.title }}
            />
            <span className="text-[#6C737F] text-sm">{modalData.name}</span>
            {/* {modalData.category && (
              <span className="text-[#6C737F] text-sm">
                Category: {modalData.category.name}
              </span>
            )} */}
            <div
              className="prose mt-3 "
              dangerouslySetInnerHTML={{ __html: modalData.description }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
