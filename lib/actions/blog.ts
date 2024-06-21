"use server";

import { BlogFormSchema } from "@/app/dashboard/schema";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../supabase";

const DASHBOARD = "/dashboard";

export async function createBlog(data: z.infer<typeof BlogFormSchema>) {
    const supabase = await createSupabaseServerClient();
    const { ["content"]: excludedKey, ...blog } = data;
    const resultBlog = await supabase.from("blog").insert(blog).select("id").single();
    if (resultBlog.error) {
        return JSON.stringify(resultBlog)
    } else {
        const result = await supabase.from("blog_content").insert({ blog_id: resultBlog.data.id, content: data.content });
        revalidatePath(DASHBOARD);
        return JSON.stringify(result);
    }
}

export async function readBlogs() {
    const supabase = await createSupabaseServerClient();
    return supabase.from("blog").select("*").eq("is_published", true).order("created_at", { ascending: true });
}

export async function readBlogsAdmin() {
    const supabase = await createSupabaseServerClient();
    return supabase.from("blog").select("*").order("created_at", { ascending: true });
}

export async function deleteBlogById(id: string) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("blog").delete().match({ id });
    revalidatePath(DASHBOARD)
    return JSON.stringify(result);
}

export async function updateBlogById(id: string, data: z.infer<typeof BlogFormSchema>) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("blog").update(data).match({ id });
    revalidatePath(DASHBOARD)
    return JSON.stringify(result);
}

export async function readBlogContentById(id: string) {
    const supabase = await createSupabaseServerClient();
    return supabase.from("blog").select("*, blog_content(*)").eq("id", id).single();
}

export async function updateBlogDetailById(id: string, data: z.infer<typeof BlogFormSchema>) {
    const supabase = await createSupabaseServerClient();
    const { ["content"]: excludedKey, ...blog } = data;
    const resultBlog = await supabase.from("blog").update(blog).match({ id });
    if (resultBlog.error) {
        return JSON.stringify(resultBlog)
    } else {
        const result = await supabase.from("blog_content").update({ content: data.content }).eq("blog_id", id);
        revalidatePath(DASHBOARD);
        return JSON.stringify(result);
    }
}

export async function readBlogById(id: string) {
    const supabase = await createSupabaseServerClient();
    return supabase.from("blog").select("*").eq("id", id).single();
}