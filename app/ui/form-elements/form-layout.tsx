const FormLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-5  ">
      <div className="font-semibold w-1/2">{title}</div>
      <div className="flex flex-col gap-4 w-full">{children}</div>
    </div>
  );
};

export default FormLayout;
