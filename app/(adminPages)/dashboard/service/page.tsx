"use client";

import AdminTable from "@/app/ui/admin-table/admin-table";
import PageHeader from "@/app/ui/page-header/page-header";

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
      key: "description",
      label: "Description",
      render: (value: string) => {
        return <span className="text-sm">{value}</span>;
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
  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Services" addlink="./service/create" />
      <AdminTable tableHead={tableHead} tableData={tableDataStatic} />
    </div>
  );
}
