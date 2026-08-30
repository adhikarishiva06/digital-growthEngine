"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeadCaptureModal from "./LeadCaptureModal";
import { Check, Lock } from "lucide-react";

type Tier = {
  id: "silver" | "gold" | "platinum";
  name: string;
  low: number;
  high: number;
  features: string[];
  isPopular?: boolean;
};

const tiers: Tier[] = [
  {
    id: "silver",
    name: "Silver",
    low: 500,
    high: 700,
    features: ["Basic Social Media Management", "Monthly Reporting", "Standard SEO Audit"],
  },
  {
    id: "gold",
    name: "Gold",
    low: 1000,
    high: 1300,
    features: ["Advanced Social Strategies", "Bi-weekly Strategy Calls", "Comprehensive SEO Setup", "Content Calendar"],
    isPopular: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    low: 2000,
    high: 2500,
    features: ["Omnichannel Dominance", "Weekly Growth Calls", "Priority Support", "Custom Analytics Dashboard", "Full Funnel Optimization"],
  },
];

export default function PricingBuilder() {
  const [selectedTier, setSelectedTier] = useState<Tier["id"] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTier = tiers.find(t => t.id === selectedTier);

  const priceRange = useMemo(() => {
    if (!currentTier) return { low: 0, high: 0 };
    return { low: currentTier.low, high: currentTier.high };
  }, [currentTier]);

  return (
    <section id="pricing-builder" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Build Your Growth Engine
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Transparent pricing tailored to your exact needs. Choose a base tier to get started. We will review your selection and reach out via phone to customize a final price based on your business necessity.
          </p>
        </div>

        {/* Tier Selector */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedTier(tier.id)}
                className={`relative cursor-pointer rounded-2xl border-2 transition-all p-8 flex flex-col ${
                  isSelected 
                    ? "border-purple-600 shadow-xl shadow-purple-600/10 bg-white" 
                    : tier.isPopular 
                      ? "border-purple-200 bg-purple-50/30 hover:border-purple-400" 
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}
                
                {isSelected && (
                  <div className="absolute top-4 right-4 text-purple-600">
                    <Check className="w-6 h-6" />
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900">{tier.name}</h3>
                <div className="mt-2 mb-6 text-slate-500 font-medium">
                  Starts at ${tier.low} - ${tier.high}/mo
                </div>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-slate-700 text-sm">
                      <Check className="w-5 h-5 text-purple-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isSelected 
                      ? "bg-purple-600 text-white" 
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {isSelected ? "Selected" : "Select Tier"}
                </button>
              </motion.div>
            );
          })}
        </div>
        {/* Static Summary Box */}
        <AnimatePresence>
          {selectedTier && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="max-w-5xl mx-auto mt-8 bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl p-6 md:p-8 relative z-10"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 w-full md:w-auto">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Selected Base</p>
                    <p className="text-xl font-black text-slate-900 capitalize">{currentTier?.name} Tier</p>
                  </div>
                </div>
                
                {/* Strategic Conversion Copy (Center) */}
                <div className="hidden lg:flex flex-col items-center justify-center flex-1 px-8 text-center max-w-md mx-auto">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">💡</span>
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">Zero-Risk Strategy</p>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    We will map out a customized growth plan for your business. If you don't absolutely love the strategy, you walk away with free advice.
                  </p>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-8">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Est. Investment</p>
                    <p className="text-2xl font-black text-slate-900 whitespace-nowrap">
                      ${priceRange.low} - ${priceRange.high} <span className="text-sm font-normal text-slate-500">/ mo</span>
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3.5 rounded-lg font-bold transition-colors whitespace-nowrap shadow-lg shadow-purple-600/30 w-full md:w-auto text-lg"
                    >
                      Book Free Consultation
                    </button>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium whitespace-nowrap">
                      <Lock className="w-3.5 h-3.5" />
                      <span>No payment required today</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LeadCaptureModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        baseTier={selectedTier}
        priceRange={priceRange}
      />
    </section>
  );
}
