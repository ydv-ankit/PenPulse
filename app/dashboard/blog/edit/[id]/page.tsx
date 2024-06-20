import { readBlogContentById } from "@/lib/actions/blog";
import React from "react";
import EditForm from "./components/EditForm";

export default async function page({ params }: { params: { id: string } }) {
  const { data: blog } = await readBlogContentById(params.id);

  return <EditForm blog={blog} />;
}
