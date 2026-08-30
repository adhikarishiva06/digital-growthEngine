"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, MapPin } from "lucide-react";

const results = [
  {
    niche: "Local Fitness Studio",
    metric: "+312%",
    metricLabel: "Increase in Lead Volume",
    icon: Users,
    timeline: "120 Days",
    story: "This boutique gym was relying entirely on foot traffic. We implemented a localized Meta Ads strategy combined with a lead-nurture email sequence. They maxed out their class capacity in 4 months.",
    color: "pink"
  },
  {
    niche: "High-Ticket Consultant",
    metric: "4.2x",
    metricLabel: "Return on Ad Spend (ROAS)",
    icon: TrendingUp,
    timeline: "6 Months",
    story: "A business coach selling a $5k program was burning cash on broad targeting. We completely rebuilt their funnel, tightened their ad targeting, and dialed in their email automation.",
    color: "blue"
  },
  {
    niche: "Restaurant",
    metric: "Top 3",
    metricLabel: "Google Map Pack Ranking",
    icon: MapPin,
    timeline: "45 Days",
    story: "Hidden on page 3 of local search results, this restaurant was invisible to tourists. We completely overhauled their Local SEO profile and citation consistency, resulting in a massive surge in weekend reservations.",
    color: "purple"
  }
];

export default function ResultsSection() {
  return (
    <section id="results" className="py-24 bg-slate-50 relative overflow-hidden border-y border-slate-200">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Don't Just Take Our Word For It
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We don't deal in vanity metrics like "impressions". We measure success by the only metric that matters: money in your bank account.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {results.map((result, idx) => {
            const Icon = result.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50 hover:border-purple-200 transition-all relative overflow-hidden group hover:-translate-y-1"
              >
                {/* Subtle hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${result.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">{result.niche}</div>
                    <div className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                      {result.timeline}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${result.color}-100 text-${result.color}-600 mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-5xl font-black text-slate-900 mb-2">{result.metric}</h3>
                    <p className={`text-${result.color}-600 font-semibold uppercase tracking-wide text-sm`}>
                      {result.metricLabel}
                    </p>
                  </div>

                  <div className="w-full h-px bg-slate-100 mb-6"></div>

                  <p className="text-slate-600 leading-relaxed text-sm">
                    {result.story}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
