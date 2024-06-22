import GoBack from "@/components/GoBack";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="font-bold m-4">Error while authenticating...</div>
      <GoBack />
    </div>
  );
}
