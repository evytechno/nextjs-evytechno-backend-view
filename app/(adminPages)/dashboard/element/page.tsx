"use client";

import { fetchElementList, updateElement } from "@/app/API/element.route";
import AdminTable from "@/app/ui/admin-table/admin-table";
import { Button } from "@/app/ui/buttons/button";
import PageHeader from "@/app/ui/page-header/page-header";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import editIcon from "@/public/static/mingcute--edit-line.png";
import deleteIcon from "@/public/static/mingcute--delete-line.png";
import DropDown from "@/app/ui/form-elements/dropdown";
import Swal from "sweetalert2";
import { fetchServiceList } from "@/app/API/services.route";

export default function Page() {
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
        return <span className="font-semibold">{value}</span>;
      },
    },
    {
      key: "description",
      label: "Description",
      render: (value: string) => {
        return <span className="text-sm line-clamp-2">{value}</span>;
      },
    },
    {
      key: "service",
      label: "Service",
      render: (value: object) => {
        return <span className="text-sm">{value?.name}</span>;
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
                redirect(`/dashboard/element/${value}`);
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
      name: "Custom Website Development",
      icon: "./def/imh.jpg",
      description:
        "Tailored to meet your unique business needs and goals, we offer:",
      service: "Web Dev",
    },
    {
      _id: "68ac4cf5f6405d14145c26c2",
      name: "On Page SEO",
      icon: "./def/imh.jpg",
      description:
        "We optimize your website’s content, structure, and meta tags to make it search-engine-friendly. This includes:",
      service: "SEO",
    },
    {
      _id: "68ac4d6c451cbebaa7a25da6",
      name: "Android App Development",
      icon: "./def/imh.jpg",
      description:
        "Tap into the vast Android market with innovative and high-performance appst",
      service: "App Dev",
    },
  ];
  const [options, setOptions] = useState([]);

  const [service, setService] = useState("");

  const [tableData, setTableData] = useState([]);
  async function getData(s: string) {
    const elementList = await fetchElementList(s);
    console.log(elementList);
    setTableData(elementList.data);
  }

  const onDelete = async (id: string) => {
    const formData = { is_deleted: String(true) };
    console.log(id);

    try {
      const resp = await updateElement(id, JSON.stringify(formData));

      const newTable = tableData.filter((element) => {
        return element._id !== id;
      });
      setTableData([...newTable]);
      Swal.fire({
        title: "Deleted",
        text: "Element Deleted Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  async function onServiceChange(e) {
    await getData(e.target.value);
    setService(e.target.value);
  }

  useEffect(() => {
    async function getServices() {
      const servicesData = await fetchServiceList();
      console.log(servicesData);
      setOptions(servicesData.data);
    }
    getServices();
    getData(service);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Elements of Services" addlink="./element/create" />
      <div className="w-1/4">
        <DropDown
          name="service"
          placeholder="Filter by Service"
          options={options}
          onChange={(e) => onServiceChange(e)}
        />
      </div>

      {tableData.length === 0 ? (
        <span>No Data</span>
      ) : (
        <AdminTable tableHead={tableHead} tableData={tableData} />
      )}
    </div>
  );
}
