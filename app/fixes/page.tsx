import type { Metadata } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import FixesForm from "./FixesForm";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["500"], variable: "--font-bodoni" });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "3 Free Fixes | Digi Growth Engine",
  description:
    "We'll spend 20 minutes on your Instagram and Google profile and send you 3 things you can fix today.",
};

export default function FixesPage() {
  return (
    <main
      className={`${bodoni.variable} ${jost.variable} min-h-screen bg-[#F7E9E4] text-[#4A1B33] flex items-center justify-center px-4 py-16`}
      style={{ fontFamily: "var(--font-jost), system-ui, sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/dge-monogram.svg" alt="Digi Growth Engine" className="w-16 mb-8" />

        <p className="text-[11px] tracking-[0.25em] text-[#B88A5E] font-medium mb-3">
          DIGI GROWTH ENGINE
        </p>
        <h1
          className="text-4xl leading-tight mb-4 text-balance"
          style={{ fontFamily: "var(--font-bodoni), Georgia, serif" }}
        >
          3 free fixes for your Instagram and Google listing
        </h1>
        <div className="h-px w-12 bg-[#D8BC85] mb-5" />
        <p className="text-base leading-relaxed text-[#4A1B33]/80 mb-8">
          Tell us where to look. We&apos;ll spend 20 minutes on your Instagram and Google
          profile and send you 3 things you can fix today.
        </p>

        <FixesForm />

        <p className="mt-10 text-sm text-[#4A1B33]/70">
          Questions? hello@digigrowthengine.com · <span className="whitespace-nowrap">(847) 496-0392</span>
        </p>
      </div>
    </main>
  );
}
