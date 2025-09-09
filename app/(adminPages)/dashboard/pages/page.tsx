"use client";
import AdminTable from "@/app/ui/admin-table/admin-table";
import { Button } from "@/app/ui/buttons/button";
import PageHeader from "@/app/ui/page-header/page-header";
import Image from "next/image";
import editIcon from "@/public/static/mingcute--edit-line.png";
import deleteIcon from "@/public/static/mingcute--delete-line.png";
import { redirect } from "next/navigation";
import { fetchPageList, updatePage } from "@/app/API/pages.route";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function Page() {
  const [tableData, setTableData] = useState([]);

  const tableHead = [
    {
      key: "name",
      label: "Name",
      render: (value: string) => {
        return <span className="font-semibold">{value}</span>;
      },
    },
    {
      key: "title",
      label: "Title",
      render: (value: string) => {
        return <span className="font-sans">{value}</span>;
      },
    },
    {
      key: "description",
      label: "Description",
      render: (value: string) => {
        return <span className="text-sm">{value}</span>;
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
                redirect(`/dashboard/pages/${value}`);
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

  async function getData() {
    const pageList = await fetchPageList();
    console.log(pageList);
    setTableData(pageList.data);
  }

  const onDelete = async (pageId: string) => {
    const formData = { is_deleted: String(true) };
    console.log(pageId);

    try {
      const resp = await updatePage(pageId, JSON.stringify(formData));

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

  const tableDataStatic = [
    {
      _id: "68ac4ccaf6405d14145c26be",
      name: "About",
      title: "Innovate. Create. Dominate– The Evy Techno Way",
      description:
        "At Evy Techno Where Creativity Meets Algorithms, we are a dynamic team of innovators, strategists, and tech enthusiasts dedicated to transforming businesses through cutting-edge digital solutions. With expertise in web development, app development, graphic designing, search engine optimization (SEO), and digital marketing, we help brands establish a powerful online presence and stay ahead in the digital era. Our mission is to craft intuitive, high-performance websites and applications that drive engagement and growth. Whether you need a stunning website, a feature-rich mobile app, or a robust digital marketing strategy, Evy Techno ensures top-tier solutions tailored to your needs. We believe in innovation, creativity, and result-driven strategies, making us the trusted technology partner for startups, enterprises, and growing businesses. Let’s build something extraordinary together!",
      image: "./abc/cd.png",
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Services" addlink="./pages/create" />
      <AdminTable tableHead={tableHead} tableData={tableData} />
    </div>
  );
}
