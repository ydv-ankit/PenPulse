"use client";

import BlogForm from "@/app/dashboard/components/BlogForm";
import { BlogFormSchema } from "@/app/dashboard/schema";
import { toast } from "@/components/ui/use-toast";
import { updateBlogDetailById } from "@/lib/actions/blog";
import { IBlogDetail } from "@/lib/types";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

export default function EditForm({ blog }: { blog: IBlogDetail }) {
  const router = useRouter();
  const handleUpdate = async (data: z.infer<typeof BlogFormSchema>) => {
    const res = await updateBlogDetailById(blog?.id!, data);
    const { error } = JSON.parse(res);
    if (error?.message) {
      toast({
        title: `Failed to update blog`,
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: `Blog updated successfully: ${data.title}`,
      });
      router.push("/dashboard");
    }
  };
  return <BlogForm onHandleSubmit={handleUpdate} blog={blog} />;
}
