"use client";

import React from "react";
import BlogForm from "../../components/BlogForm";
import { BlogFormSchema } from "../../schema";
import { z } from "zod";
import { createBlog } from "@/lib/actions/blog";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const handleCreate = async (data: z.infer<typeof BlogFormSchema>) => {
    const res = await createBlog(data);
    const { error } = JSON.parse(res);
    if (error?.message) {
      toast({
        title: `Failed to create blog`,
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: `Blog created successfully: ${data.title}`,
      });
      router.push("/dashboard");
    }
  };

  return <BlogForm onHandleSubmit={handleCreate} />;
}
