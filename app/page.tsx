import Footer from "@/components/Footer";
import { readBlogs } from "@/lib/actions/blog";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data: blogs } = await readBlogs();

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-5 xl:p-0 min-h-[50dvh]">
        {blogs?.length === 0 && (
          <div className="w-full col-span-3 h-72 sm:w-full  md:h-64 xl:h-96  relative flex justify-center items-center flex-col">
            <div className="text-lg sm:text-3xl font-semibold text-nowrap">No blogs to show !</div>
            <div className="text-md sm:text-xl mt-4">Create one to view</div>
          </div>
        )}
        {blogs?.map((blog, index) => {
          return (
            <Link
              href={"/blog/" + blog.id}
              className="w-full  border rounded-md dark:bg-graident-dark p-5 hover:ring-2 ring-green-500 transition-all cursor-pointer space-y-5 first:lg:col-span-2 first:md:col-span-3"
              key={index}>
              <div className="w-full h-72 sm:w-full  md:h-64 xl:h-96  relative">
                <Image
                  priority
                  src={blog.image_url}
                  alt="cover"
                  fill
                  className=" rounded-md object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm dark:text-gray-400">
                  {new Date(blog.created_at).toDateString()}
                </p>

                <h1 className="text-xl font-bold dark:text-gray-300">
                  {blog.title}
                </h1>
              </div>
            </Link>
          );
        })}
      </div>
      <Footer />
    </>
  );
}
