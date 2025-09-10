import { Button } from "../buttons/button";
import Card from "../card/card";

const StickyHead = (name: string, publish: () => void, cancel: () => void) => {
  return (
    <div className="sticky top-19 bg-white/20 backdrop-blur-sm">
      <Card>
        <div className="flex justify-between items-center  ">
          <span className="text-[20px] font-semibold">{name}</span>
          <div className="flex gap-3">
            <Button type="submit" className="bg-[#1C2536]">
              Save
            </Button>
            <Button
              type="submit"
              className="bg-[#6366F1]"
              onClick={() => publish(true)}
            >
              Publish
            </Button>
            <Button
              type="button"
              className="bg-red-400/20 !text-red-800 "
              onClick={() => cancel()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StickyHead;
