import Card from "@/app/(adminPages)/ui/card/card";
import FormLayout from "@/app/(adminPages)/ui/form-elements/form-layout";
import Input from "@/app/(adminPages)/ui/form-elements/input";
import PageTitle from "@/app/(adminPages)/ui/text-comp/pageTitle";

export default function Page() {
  const HelloAdminCard = () => {
    return (
      <Card>
        <div className="flex justify-between items-center">
          <span className="text-[20px] font-semibold">Hello Admin!!!</span>
          <div className="flex gap-3">
            <button className="bg-[#1C2536] text-white font-semibold p-4 rounded-3xl">
              Save
            </button>
            <button className="bg-[#6366F1] text-white font-semibold p-4 rounded-3xl">
              Publish Now
            </button>
            <button className="bg-red-400/20 text-red-800 font-semibold p-4 rounded-3xl">
              Cancel
            </button>
          </div>
        </div>
      </Card>
    );
  };
  const BasicDetailsCard = () => {
    return (
      <Card>
        <div className="flex justify-between items-center">
          <div className="font-semibold w-1/2">Basic Details</div>
          <FormLayout>
            <Input name="title" placeholder="Blog Title" />
            <Input name="short_description" placeholder="Short Description" />
          </FormLayout>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <PageTitle>Create a New Blog</PageTitle>
      <form>
        <HelloAdminCard />
        <BasicDetailsCard />
      </form>
    </div>
  );
}
