import AddButton from "../buttons/add-button";
import PageTitle from "../text-comp/pageTitle";

const PageHeader = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-between">
      <PageTitle>{name}</PageTitle>
      <AddButton />
    </div>
  );
};

export default PageHeader;
