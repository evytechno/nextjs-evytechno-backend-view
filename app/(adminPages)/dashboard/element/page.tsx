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
    {
      key: "service",
      label: "Service",
      render: (value: string) => {
        return <span className="text-sm">{value}</span>;
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

  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Elements of Services" addlink="./element/create" />
      <AdminTable tableHead={tableHead} tableData={tableDataStatic} />
    </div>
  );
}
