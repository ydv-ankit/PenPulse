"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  EyeOpenIcon,
  Pencil1Icon,
  RocketIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { Switch } from "@/components/ui/switch";
import { BsSave } from "react-icons/bs";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import { BlogFormSchema } from "../schema";
import { z } from "zod";
import { IBlogDetail } from "@/lib/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import GoBack from "@/components/GoBack";

export default function BlogForm({
  onHandleSubmit,
  blog,
}: {
  onHandleSubmit: (data: z.infer<typeof BlogFormSchema>) => void;
  blog?: IBlogDetail;
}) {
  const [isPending, startTransition] = useTransition();
  const [isPreview, setIsPreview] = useState(false);
  const form = useForm({
    mode: "all",
    resolver: zodResolver(BlogFormSchema),
    defaultValues: {
      title: blog?.title || "",
      image_url: blog?.image_url || "",
      content: blog?.blog_content?.content || "",
      is_published: blog?.is_published || false,
      is_premium: blog?.is_premium || false,
    },
  });

  const onSubmit = async (data: z.infer<typeof BlogFormSchema>) => {
    startTransition(() => {
      onHandleSubmit(data);
    });
  };

  return (
    <Form {...form}>
      <form
        className="w-full border rounded-md space-y-6 pb-10"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-5 flex items-center justify-between border-b gap-5 flex-wrap">
          <div className="flex items-center gap-5 flex-wrap">
            <span
              role="button"
              tabIndex={0}
              className={cn(
                "flex items-center gap-1 border bg-zinc-700 p-2 rounded-md hover:ring-2 hover:ring-zinc-400 transition-all",
                !form.getFieldState("image_url").invalid
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              )}
              onClick={() =>
                setIsPreview(
                  !isPreview && !form.getFieldState("image_url").invalid
                )
              }>
              {isPreview ? (
                <>
                  <Pencil1Icon />
                  Edit
                </>
              ) : (
                <>
                  <EyeOpenIcon />
                  Preview
                </>
              )}
            </span>
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-1 border bg-zinc-700 p-2 rounded-md">
                      <RocketIcon />
                      <span>Publish</span>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <GoBack />
            <Button
              className="flex items-center gap-2"
              disabled={!form.formState.isValid}>
              {isPending ? (
                <AiOutlineLoading3Quarters
                  className={cn("animate-spin", { hidden: !isPending })}
                />
              ) : (
                <BsSave />
              )}
              Save
            </Button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 w-full flex break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x"
                  )}>
                  <Input
                    placeholder="title"
                    {...field}
                    className={cn(
                      "border-none font-medium leading-relaxed text-lg",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "px-2",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}>
                    <h1 className="text-3xl font-medium">
                      {form.getValues().title}
                    </h1>
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("title").invalid &&
                form.getValues().title && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 w-full flex break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x"
                  )}>
                  <Input
                    placeholder="image url"
                    {...field}
                    className={cn(
                      "border-none font-medium leading-relaxed text-lg",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "px-2",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}>
                    {!isPreview ? (
                      <>
                        <p>Click on preview to see image</p>
                      </>
                    ) : (
                      <div className="relative h-80 mt-5 border rounded-md px-2">
                        <Image
                          src={form.getValues().image_url}
                          alt="preview"
                          fill
                          className="object-cover object-centerm rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("image_url").invalid &&
                form.getValues().image_url && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div
                  className={cn(
                    "p-2 w-full flex break-words gap-2",
                    isPreview ? "divide-x-0" : "divide-x h-70vh"
                  )}>
                  <Textarea
                    placeholder="content"
                    {...field}
                    className={cn(
                      "border font-medium leading-relaxed text-lg resize-none h-full",
                      isPreview ? "w-0 p-0" : "w-full lg:w-1/2"
                    )}
                  />
                  <div
                    className={cn(
                      "overflow-y-auto border",
                      isPreview
                        ? "mx-auto w-full lg:w-4/5"
                        : "w-1/2 lg:block hidden"
                    )}>
                    <MarkdownPreview content={form.getValues().content} className="p-2" />
                  </div>
                </div>
              </FormControl>
              {form.getFieldState("content").invalid &&
                form.getValues().content && <FormMessage />}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
