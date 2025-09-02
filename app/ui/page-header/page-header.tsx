import AddButton from "../buttons/add-button";
import PageTitle from "../text-comp/pageTitle";

const PageHeader = ({ name, addlink }: { name: string; addlink: string }) => {
  return (
    <div className="flex justify-between">
      <PageTitle>{name}</PageTitle>
      <AddButton link={addlink} />
    </div>
  );
};

export default PageHeader;
