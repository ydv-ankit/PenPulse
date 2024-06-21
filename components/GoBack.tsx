"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GoBack() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <div className="flex justify-end">
      <Button variant={"outline"} onClick={goBack}>
        Go Back
      </Button>
    </div>
  );
}
