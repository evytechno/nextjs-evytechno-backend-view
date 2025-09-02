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
  ];

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
  return (
    <div className="flex flex-col gap-5">
      <PageHeader name="Services" addlink="./pages/create" />
      <AdminTable tableHead={tableHead} tableData={tableDataStatic} />
    </div>
  );
}
