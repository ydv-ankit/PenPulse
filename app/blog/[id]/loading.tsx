export default async function Loading() {
  return (
    <div className="px-2 py-4">
      <div className="w-full flex justify-end">
        <div className="w-32 h-14 bg-gradient-dark rounded-md relative right-0 animate-pulse"></div>
      </div>
      <div className="my-4">
        <div className="w-36 md:w-96 h-14 bg-gradient-dark rounded-md animate-pulse"></div>
      </div>
      <div className="relative h-96 mt-8 border rounded-md mb-8 bg-gradient-dark animate-pulse"></div>
    </div>
  );
}
