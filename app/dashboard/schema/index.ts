import * as z from "zod";

export const BlogFormSchema = z
  .object({
    title: z.string().min(2, {
      message: "Title must be atleast 2 characters",
    }),
    image_url: z.string().url({
      message: "Image URL must be a valid URL",
    }),
    content: z.string().min(2, {
      message: "Content must be atleast 2 characters",
    }),
    is_published: z.boolean(),
    is_premium: z.boolean(),
  })
  .refine(
    (data) => {
      const image_url = data.image_url;
      try {
        const url = new URL(image_url);
        return url.hostname === "images.unsplash.com";
      } catch (error) {
        return false;
      }
    },
    {
      message: "Currently only images from Unsplash.com are supported",
      path: ["image_url"],
    }
  );