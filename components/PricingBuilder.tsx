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
    features: ["Every channel, one connected strategy", "Weekly Growth Calls", "Priority Support", "Custom Analytics Dashboard", "Optimized from first click to paying customer"],
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
            Get Your Growth Diagnostic Pricing
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Here's where most clients land. We'll confirm your exact number on one 15-minute call, with no pricing games and no surprise upsells.
          </p>
        </div>

        {/* Tier Selector */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTier(tier.id);
                    setIsModalOpen(true);
                  }}
                  className="w-full py-3 rounded-lg font-bold transition-colors bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                >
                  Book Free Consultation
                </button>
              </motion.div>
            );
          })}
        </div>
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
