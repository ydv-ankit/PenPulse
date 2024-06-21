import { Button } from "@/components/ui/button";
import { EyeOpenIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  readBlogsAdmin,
  readBlogsByUserId,
  updateBlogById,
} from "@/lib/actions/blog";
import DeleteAlert from "./DeleteAlert";
import SwitchForm from "./SwitchForm";
import { z } from "zod";
import { BlogFormSchema } from "../schema";
import Link from "next/link";

export default async function BlogTable() {
  // const { data: blogs } =
  //   userCookie.user.user_metadata.role === "admin"
  //     ? await readBlogsAdmin()
  //     : await readBlogsByUserId(userCookie.user.id);
  const { data: blogs } = await readBlogsAdmin();

  return (
    <div className="overflow-x-auto">
      <div className="border bg-gradient-dark rounded-md md:w-full w-[800px]">
        {blogs?.length === undefined ? (
          <h1 className="p-4 text-center font-bold text-xl">
            Create a blog first
          </h1>
        ) : (
          <>
            <div className="grid grid-cols-4 p-5 border-b text-gray-500">
              <h1 className="col-span-2">Title</h1>
              <h1 className="">Publish</h1>
              <h1 className="">Actions</h1>
            </div>
            {blogs?.map((blog, index) => {
              const updatePublish = updateBlogById.bind(null, blog.id, {
                is_published: !blog.is_published,
              } as z.infer<typeof BlogFormSchema>);

              return (
                <div key={index} className="grid grid-cols-4 p-5 border-b">
                  <h1 className="col-span-2">{blog.title}</h1>
                  <SwitchForm
                    checked={blog.is_published}
                    onToggle={updatePublish}
                    name="publish"
                  />
                  <Actions id={blog.id} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

const Actions = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap md:flex-row w-full">
      <Link href={`/blog/${id}`}>
        <Button variant={"outline"} className="flex items-center gap-2">
          <EyeOpenIcon />
          View
        </Button>
      </Link>
      <DeleteAlert blogId={id} />
      <Link href={`/dashboard/blog/edit/${id}`}>
        <Button variant={"outline"} className="flex items-center gap-2">
          <Pencil1Icon />
          Edit
        </Button>
      </Link>
    </div>
  );
};
