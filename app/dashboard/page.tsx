import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import BlogTable from "./components/BlogTable";
import { createSupabaseServerClient } from "@/lib/supabase";

export default async function Dashboard() {
  const supabase = createSupabaseServerClient();

  // extract user id and role
  const user = await supabase
    .then(async (res) => {
      return await res.auth
        .getUser()
        .then((res) => {
          return {
            id: res.data.user?.id,
            role: res.data.user?.user_metadata.role,
          };
        })
        .catch((err) => {
          return null;
        });
    })
    .catch((err) => {
      return null;
    });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Link href="/dashboard/blog/create">
          <Button variant={"outline"} className="font-bold gap-2">
            Create <PlusIcon />
          </Button>
        </Link>
      </div>
      <BlogTable user={user}/>
    </div>
  );
}
