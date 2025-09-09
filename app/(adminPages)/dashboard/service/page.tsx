"use client";

import AdminTable from "@/app/ui/admin-table/admin-table";
import { Button } from "@/app/ui/buttons/button";
import PageHeader from "@/app/ui/page-header/page-header";
import Image from "next/image";
import { redirect } from "next/navigation";
import editIcon from "@/public/static/mingcute--edit-line.png";
import deleteIcon from "@/public/static/mingcute--delete-line.png";
import { fetchServiceList, updateService } from "@/app/API/services.route";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
                redirect(`/dashboard/service/${value}`);
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
      _id: "68ac4ccaf6405d14145c26be",
      name: "Web Dev",
      icon: "./def/imh.jpg",
      description: "We do Web development",
      image: "./abc/cd.png",
      __v: 0,
    },
    {
      _id: "68ac4cf5f6405d14145c26c2",
      name: "SEO",
      icon: "./def/imh.jpg",
      description: "We do SEO here",
      image: "./abc/cd.png",
      __v: 0,
    },
    {
      _id: "68ac4d6c451cbebaa7a25da6",
      name: "App Dev",
      icon: "./def/imh.jpg",
      description: "We do Web development",
      image: "./abc/cd.png",
      __v: 0,
    },
  ];

  async function getData() {
    const serviceList = await fetchServiceList();
    console.log(serviceList);
    setTableData(serviceList.data);
  }

  const onDelete = async (id: string) => {
    const formData = { is_deleted: String(true) };
    console.log(id);

    try {
      const resp = await updateService(id, JSON.stringify(formData));

      const newTable = tableData.filter((service) => {
        return service._id !== id;
      });
      setTableData([...newTable]);
      Swal.fire({
        title: "Deleted",
        text: "Service Deleted Successfully",
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
      <PageHeader name="Services" addlink="./service/create" />
      {tableData.length === 0 ? (
        <span>No Data</span>
      ) : (
        <AdminTable tableHead={tableHead} tableData={tableData} />
      )}
    </div>
  );
}
