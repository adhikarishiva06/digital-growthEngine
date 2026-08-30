"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";

const dashboardData = {
  seo: {
    id: "seo",
    label: "Local SEO",
    icon: TrendingUp,
    color: "purple",
    stats: [
      { label: "Organic Traffic", value: "24.5K", badge: "+312%", badgeColor: "bg-green-100 text-green-700" },
      { label: "Map Pack Rank", value: "Top 3", badge: "Target Hit", badgeColor: "bg-purple-100 text-purple-700" },
      { label: "Inbound Leads", value: "84", badge: "+145%", badgeColor: "bg-green-100 text-green-700" }
    ],
    chartTitle: "Search Visibility Trajectory",
    chartPath: "M0,90 Q30,85 50,60 T100,10"
  },
  social: {
    id: "social",
    label: "Social Media",
    icon: Users,
    color: "pink",
    stats: [
      { label: "Monthly Reach", value: "182K", badge: "+850%", badgeColor: "bg-green-100 text-green-700" },
      { label: "Engagement", value: "8.4%", badge: "High", badgeColor: "bg-pink-100 text-pink-700" },
      { label: "New Followers", value: "4.2K", badge: "+210%", badgeColor: "bg-green-100 text-green-700" }
    ],
    chartTitle: "Audience Growth Trajectory",
    chartPath: "M0,80 Q40,90 60,40 T100,20"
  },
  ads: {
    id: "ads",
    label: "Paid Ads",
    icon: Target,
    color: "blue",
    stats: [
      { label: "Cost Per Lead", value: "$12.40", badge: "-45%", badgeColor: "bg-blue-100 text-blue-700" },
      { label: "ROAS", value: "4.2x", badge: "Profitable", badgeColor: "bg-green-100 text-green-700" },
      { label: "Total Leads", value: "342", badge: "+310%", badgeColor: "bg-green-100 text-green-700" }
    ],
    chartTitle: "Lead Generation Trajectory",
    chartPath: "M0,95 Q20,80 40,70 T100,15"
  }
};

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"seo" | "social" | "ads">("seo");
  const data = dashboardData[activeTab];

  const scrollToPricing = () => {
    const pricingElement = document.getElementById("pricing-builder");
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-50"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 rounded-full bg-purple-50 blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            We Run Your Social & SEO <br className="hidden md:block" />
            <span className="text-purple-600">So You Can Run Your Business.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Transparent, data-driven marketing designed exclusively for solopreneurs and small agencies. 
            No fluff, just results.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToPricing}
            className="group inline-flex items-center justify-center rounded-full bg-purple-600 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-purple-600/30 transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Get Your Free Growth Diagnostic
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Interactive Dashboard Element */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden glass-kitchen-effect flex flex-col"
        >
          {/* Dashboard Header / Browser Bar */}
          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 text-xs font-medium text-slate-400 hidden sm:block">Behind the Scenes - Performance Dashboard</div>
            </div>
            
            {/* Interactive Tabs */}
            <div className="flex bg-slate-200/50 p-1 rounded-lg">
              {Object.values(dashboardData).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "seo" | "social" | "ads")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      isActive 
                        ? "bg-white text-slate-900 shadow-sm" 
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? `text-${tab.color}-500` : ""}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Dashboard Content */}
          <div className="aspect-[16/9] md:aspect-[21/9] bg-slate-50 relative flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[length:20px_20px]"></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              
              <div className="w-full h-full flex flex-col md:flex-row gap-6">
                {/* Stats Column */}
                <div className="flex flex-col justify-center gap-3 md:gap-4 w-full md:w-1/3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab + "-stats"}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-3 md:gap-4"
                    >
                      {data.stats.map((stat, i) => (
                        <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between ${i === 2 ? 'hidden sm:flex' : ''}`}>
                          <div>
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-xl md:text-2xl font-bold text-slate-900">{stat.value}</p>
                          </div>
                          <div className={`${stat.badgeColor} text-xs font-bold px-2 py-1 rounded flex items-center`}>
                            {stat.badge}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* Chart Column */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 relative flex flex-col min-h-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeTab + "-title"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-bold text-slate-800 mb-6"
                    >
                      {data.chartTitle}
                    </motion.p>
                  </AnimatePresence>
                  
                  <div className="flex-1 relative w-full flex items-end">
                    {/* SVG Line Chart */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id={`gradient-${activeTab}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={data.color === "purple" ? "#9333ea" : data.color === "pink" ? "#ec4899" : "#3b82f6"} stopOpacity="0.2" />
                          <stop offset="100%" stopColor={data.color === "purple" ? "#9333ea" : data.color === "pink" ? "#ec4899" : "#3b82f6"} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      <line x1="0" y1="25" x2="100" y2="25" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />
                      <line x1="0" y1="75" x2="100" y2="75" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="2" />

                      {/* Area Fill */}
                      <motion.path 
                        key={activeTab + "-fill"}
                        d={`${data.chartPath} L100,100 L0,100 Z`}
                        fill={`url(#gradient-${activeTab})`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      />
                      
                      {/* Line */}
                      <motion.path 
                        key={activeTab + "-line"}
                        d={data.chartPath}
                        fill="none"
                        stroke={data.color === "purple" ? "#9333ea" : data.color === "pink" ? "#ec4899" : "#3b82f6"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                      
                      {/* Data Point Marker */}
                      <motion.circle 
                        key={activeTab + "-circle"}
                        cx="100" 
                        cy={data.chartPath.split("T100,")[1] || "10"} 
                        r="3" 
                        fill="#fff" 
                        stroke={data.color === "purple" ? "#9333ea" : data.color === "pink" ? "#ec4899" : "#3b82f6"} 
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2, type: "spring" }}
                      />
                    </svg>

                    {/* Overlay Label */}
                    <motion.div 
                      key={activeTab + "-label"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                      className="absolute right-0 top-0 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-xl translate-x-2 -translate-y-4 md:translate-x-4 md:-translate-y-2 hidden sm:block"
                    >
                      "The DigitalGrowthEngine Effect"
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
