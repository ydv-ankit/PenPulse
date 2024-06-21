import { readBlogContentById } from "@/lib/actions/blog";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import Image from "next/image";
import GoBack from "@/components/GoBack";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data } = await readBlogContentById(id);

  return (
    <div className="px-2 py-4">
      <GoBack />
      <div className="my-4">
        <h1 className="text-4xl font-bold">{data?.title}</h1>
      </div>
      <div className="relative h-96 mt-8 border rounded-md mb-8">
        <Image
          src={data?.image_url as string}
          alt="blog image"
          fill
          className="object-cover object-centerm rounded-md"
        />
      </div>
      <MarkdownPreview content={data?.blog_content?.content as string} />
    </div>
  );
}
