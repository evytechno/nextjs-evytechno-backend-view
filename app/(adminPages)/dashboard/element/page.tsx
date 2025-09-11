"use client";

import {
  fetchElement,
  fetchElementList,
  updateElement,
} from "@/app/API/element.route";
import AdminTable from "@/app/ui/admin-table/admin-table";
import { Button } from "@/app/ui/buttons/button";
import PageHeader from "@/app/ui/page-header/page-header";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

import editIcon from "@/public/static/mingcute--edit-line.png";
import deleteIcon from "@/public/static/mingcute--delete-line.png";
import eyeIcon from "@/public/static/mingcute--eye-line.png";

import DropDown from "@/app/ui/form-elements/dropdown";
import Swal from "sweetalert2";
import { fetchServiceList } from "@/app/API/services.route";
import Modal from "@/app/ui/modal/modal";
import TableSkeleton from "@/app/ui/skeleton/table-skeleton";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  async function getModalData(id: string) {
    const data = await fetchElement(id);
    await setModalData({ ...data.data });
    setModalOpen(true);
  }

  const tableHead = [
    {
      key: "icon",
      label: "Image and Icon",
      render: (value: string, data: any) => {
        // console.log("data at table", data);

        return (
          <div className="flex gap-2">
            {data.image && (
              <img
                src={data.image}
                className="w-10 h-10 object-cover rounded-md border-2 border-[#cccccc70]"
                alt="Image"
              />
            )}
            {value && (
              <img src={value} className="w-10 h-10 rounded-full" alt="Icon" />
            )}
          </div>
        );
      },
    },
    {
      key: "name",
      label: "Element Name",
      render: (value: string) => {
        return <span className="font-semibold">{value}</span>;
      },
    },
    {
      key: "title",
      label: "Title",
      render: (value: string) => {
        // return <span className="font-semibold">{value}</span>;
        return (
          <div
            className="prose  "
            dangerouslySetInnerHTML={{ __html: value }}
          />
        );
      },
    },
    // {
    //   key: "description",
    //   label: "Description",
    //   render: (value: string) => {
    //     return <span className="text-sm line-clamp-2">{value}</span>;
    //   },
    // },
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
              onClick={() => getModalData(value)}
              className="bg-[#15a80d] !p-1 !rounded-lg"
            >
              <Image src={eyeIcon} alt="Edit" height={24} />
            </Button>
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
    setIsLoading(true);
    const elementList = await fetchElementList(s);
    console.log(elementList);
    setTableData(elementList.data);
    setIsLoading(false);
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
      {isLoading ? (
        <TableSkeleton tableHead={tableHead} rows={4} />
      ) : (
        <>
          {tableData.length === 0 ? (
            <span>No Data</span>
          ) : (
            <AdminTable tableHead={tableHead} tableData={tableData} />
          )}
        </>
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
              <img src={modalData.image} className="w-full h-auto" />
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
