import Footer from "@/components/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
