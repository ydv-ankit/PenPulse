import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";

export default function BlogTable() {
  return (
    <div className="border bg-gradient-dark rounded-md md:w-full w-[800px]">
      <div className="grid grid-cols-5 p-5 border-b text-gray-500">
        <h1 className="col-span-2">Title</h1>
        <h1 className="">Premium</h1>
        <h1 className="">Publish</h1>
      </div>
      <div className="grid grid-cols-5 p-5">
        <h1 className="col-span-2">Blog Title</h1>
        <Switch checked={false} />
        <Switch checked={true} />
        <Actions />
      </div>
    </div>
  );
}

const Actions = () => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant={"outline"} className="flex items-center gap-2">
        <EyeOpenIcon />
        View
      </Button>
      <Button variant={"outline"} className="flex items-center gap-2">
        <TrashIcon />
        Delete
      </Button>
      <Button variant={"outline"} className="flex items-center gap-2">
        <Pencil1Icon />
        Edit
      </Button>
    </div>
  );
};
