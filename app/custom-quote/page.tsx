import CustomQuoteBuilder from "@/components/CustomQuoteBuilder";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Custom Strategy Builder | Digital Growth Engine",
  description: "Build your custom social media marketing strategy.",
};

export default function CustomQuotePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-4 relative z-10">
        <CustomQuoteBuilder />
      </main>
    </div>
  );
}
