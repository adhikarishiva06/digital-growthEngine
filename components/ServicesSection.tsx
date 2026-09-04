"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, MapPin, Target, Mail, CheckCircle2, Bot } from "lucide-react";

const services = [
  {
    id: "social-media",
    title: "Social Media Management",
    description: "We handle your posts, videos, and comments. We keep your pages active so you can focus on running your business.",
    icon: Smartphone,
    problem: "Posting consistently while running the business itself is hard, most owners fall behind, and it shows.",
    decisionPoints: [
      { title: "Time Reclaimed", detail: "How many hours a week do you waste stressing over what to post? We buy back your time." },
      { title: "Brand Perception", detail: "People look you up before they visit. If your page looks dead, they go to your competitor. We make you look like the premium option." },
      { title: "Top-of-Mind Awareness", detail: "If you aren't showing up in their feed daily, they will forget you exist when they are finally ready to buy." }
    ]
  },
  {
    id: "local-seo",
    title: "Local SEO",
    description: "We help your business show up first when people search for your services nearby. Get found by people ready to buy.",
    icon: MapPin,
    problem: "You rely entirely on word-of-mouth and are invisible to people who are actively searching for your services right now.",
    decisionPoints: [
      { title: "High-Intent Traffic", detail: "Social media is for browsing; Google is for buying. We put you at the top when someone types 'near me' with a credit card in hand." },
      { title: "The 'Zero-Click' Winner", detail: "Most people don't scroll past the top 3 map pack results. If you aren't there, you lose 70% of your potential local market share." },
      { title: "Compounding ROI", detail: "Unlike ads that stop when you stop paying, SEO builds permanent digital real estate that pays you back for years." }
    ]
  },
  {
    id: "ai-seo",
    title: "AI SEO",
    description: "We optimize your content for AI search engines like ChatGPT and Google SGE so you dominate the future of search.",
    icon: Bot,
    problem: "Traditional search is changing. Customers are asking AI for recommendations, and your business isn't showing up in the answers.",
    decisionPoints: [
      { title: "Future-Proof Visibility", detail: "We ensure your business is the one cited when potential customers ask ChatGPT or Perplexity for local recommendations." },
      { title: "AI Authority Building", detail: "AI models trust strong, authoritative signals. We feed the models exactly what they need to rank your business as the top local expert." },
      { title: "Search Generative Experience", detail: "Google's SGE pushes standard links down. We structure your content to appear directly inside the AI-generated summaries at the very top." }
    ]
  },
  {
    id: "paid-ads",
    title: "Paid Ads",
    description: "We run smart ads on Google and Meta (Facebook & Instagram) to bring you new customers quickly and safely.",
    icon: Target,
    problem: "You want more leads yesterday, but organic growth is too slow for your immediate revenue goals.",
    decisionPoints: [
      { title: "Predictable Revenue", detail: "Organic social is a marathon; Paid Ads are a light switch. We can turn on a steady stream of leads as soon as the campaign goes live." },
      { title: "Laser Targeting", detail: "We don't waste money showing your business to everyone. We only show your ads to your exact target demographic within a 10-mile radius." },
      { title: "Scalability", detail: "Once we find an ad that converts $1 into $3, you have a machine that allows you to scale your business predictably." }
    ]
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    description: "We send helpful, friendly emails to your list so your past customers keep coming back for more.",
    icon: Mail,
    problem: "You are ignoring your most valuable asset, your past customers, and leaving massive amounts of repeat business on the table.",
    decisionPoints: [
      { title: "Owned Audience", detail: "You don't own your Instagram followers; Mark Zuckerberg does. You own your email list. It's the only algorithm-proof marketing channel." },
      { title: "Highest ROI Channel", detail: "It costs 5x more to acquire a new customer than to retain an existing one. Email marketing is the cheapest way to get past customers to buy again." },
      { title: "Automated Sales", detail: "We set up automated flows (welcome emails, abandoned cart, win-backs) that literally make you money while you sleep." }
    ]
  }
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>("social-media");

  const activeData = services.find(s => s.id === activeService);

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            What We Do
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Simple, effective marketing to help your business grow. Click a service below to see exactly what it fixes.
          </p>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-6 max-w-6xl mx-auto mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;
            return (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveService(isActive ? null : service.id)}
                className={`p-1.5 sm:p-4 md:p-8 rounded-xl md:rounded-2xl transition-all cursor-pointer outline-none flex flex-col items-center justify-start md:justify-center gap-1.5 md:gap-4 text-center ${
                  isActive 
                    ? "bg-purple-600 border-2 border-purple-600 shadow-xl shadow-purple-600/20 text-white md:transform md:-translate-y-2" 
                    : "bg-slate-50 border-2 border-slate-200 hover:border-purple-300 hover:bg-purple-50 text-slate-900"
                }`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? "bg-white/20" : "bg-purple-100"
                }`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 transition-colors ${
                    isActive ? "text-white" : "text-purple-600"
                  }`} />
                </div>
                <h3 className={`font-bold text-[8px] sm:text-[10px] md:text-lg leading-tight break-words hyphens-auto ${isActive ? "text-white" : "text-slate-900"}`}>
                  {service.title}
                </h3>
              </motion.button>
            );
          })}
        </div>

        <div className="max-w-6xl mx-auto min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeData && (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
                    
                    {/* Column 1: The Problem */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-4">
                        The Problem
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-4">{activeData.title}</h4>
                      <p className="text-slate-600 leading-relaxed border-l-4 border-red-200 pl-4 italic text-sm">
                        {activeData.problem}
                      </p>
                    </div>

                    {/* Column 2: The Solution */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-6">
                        The Solution & Value
                      </div>
                      <div className="space-y-6">
                        {activeData.decisionPoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="font-bold text-slate-900 mb-1 text-sm">{point.title}</h5>
                              <p className="text-slate-600 text-xs leading-relaxed">{point.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Column 3: Visual Proof */}
                    <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 flex items-center justify-center h-full min-h-[280px]">
                    
                    {activeData.id === "social-media" && (
                      <div className="flex flex-col gap-3 w-full max-w-sm">
                        <div className="text-center mb-2 text-sm font-bold text-slate-400 uppercase tracking-widest">Brand Authority</div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                            <div className="w-full h-full bg-white rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">Your Business <span className="text-blue-500">✓</span></p>
                            <p className="text-xs text-slate-500">New reels • 4.2K views</p>
                          </div>
                          <div className="ml-auto bg-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-md">Following</div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex items-center gap-3 opacity-60">
                          <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                          <div>
                            <p className="text-xs font-bold text-slate-500">Local Competitor</p>
                            <p className="text-[10px] text-slate-400">Last posted 6 months ago</p>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {activeData.id === "local-seo" && (
                      <div className="flex flex-col w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                          <div className="bg-white h-6 w-full rounded-md ml-2 flex items-center px-3 text-xs text-slate-500 border border-slate-200 shadow-sm">
                            <span className="opacity-50 mr-2">🔍</span> service near me
                          </div>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                          <div className="text-xs font-bold text-slate-400 mb-1">Places</div>
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex gap-4 p-3 rounded-lg border-2 border-purple-500 bg-purple-50 relative">
                            <div className="absolute -left-1 -top-1 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                            <div className="w-16 h-16 bg-purple-200 rounded-md shrink-0"></div>
                            <div>
                              <p className="font-bold text-purple-900 text-sm">Your Business Name</p>
                              <p className="text-xs text-yellow-500 font-bold tracking-widest mt-0.5">★★★★★ <span className="text-slate-500 font-normal">(124)</span></p>
                              <p className="text-xs text-slate-600 mt-1">Open now • Closes 9PM</p>
                            </div>
                          </motion.div>
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex gap-4 p-3 rounded-lg border border-slate-100 opacity-50 grayscale">
                            <div className="w-16 h-16 bg-slate-200 rounded-md shrink-0"></div>
                            <div>
                              <p className="font-bold text-slate-700 text-sm">Competitor A</p>
                              <p className="text-xs text-slate-400 mt-0.5">★★★☆☆ (12)</p>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    )}

                    {activeData.id === "paid-ads" && (
                      <div className="flex flex-col gap-4 w-full max-w-sm">
                        <div className="text-center mb-1 text-sm font-bold text-slate-400 uppercase tracking-widest">Lead Generation Engine</div>
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-slate-900 rounded-xl p-4 shadow-xl border border-slate-800 text-white relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 rounded-full blur-3xl opacity-20"></div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                              <Target className="w-4 h-4 text-green-400" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-green-400">NEW HOT LEAD</p>
                              <p className="text-[10px] text-slate-400">Just now via Facebook Ads</p>
                            </div>
                          </div>
                          <div className="bg-slate-800 rounded-lg p-3 text-sm border border-slate-700">
                            <p className="font-bold">Name: Sarah Jenkins</p>
                            <p className="text-slate-300 mt-1">Phone: (555) 019-2834</p>
                            <p className="text-green-400 font-bold mt-2 text-xs">Ready to book an appointment</p>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {activeData.id === "email-marketing" && (
                      <div className="flex flex-col w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-blue-600 px-4 py-3 flex items-center justify-between text-white">
                          <div className="text-sm font-bold">Inbox (1)</div>
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-4 border-b border-blue-100 bg-blue-50/50 flex gap-3 relative">
                            <div className="w-2 h-2 rounded-full bg-blue-500 absolute left-2 top-6"></div>
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0 ml-2">YB</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline mb-0.5">
                                <p className="font-bold text-slate-900 text-sm truncate">Your Business</p>
                                <p className="text-[10px] text-blue-600 font-bold">10:42 AM</p>
                              </div>
                              <p className="text-xs font-bold text-slate-800 truncate">Claim your exclusive VIP offer 🎁</p>
                              <p className="text-xs text-slate-500 truncate mt-0.5">Hey Sarah, we miss you! Here's a special gift just for...</p>
                            </div>
                          </motion.div>
                          <div className="p-4 border-b border-slate-100 flex gap-3 opacity-50">
                            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 ml-2"></div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-slate-700 text-sm truncate">Random Newsletter</p>
                              <p className="text-xs text-slate-500 truncate">Weekly digest update</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
