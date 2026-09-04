"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, GraduationCap, Dumbbell, Utensils, Heart, MessageCircle } from "lucide-react";

const segments = [
  {
    id: "retail",
    name: "Local Retail",
    icon: Store,
    valueProp: "Foot traffic is the lifeblood of local retail. We optimize your local SEO and social presence to drive real people through your front door.",
    ig: {
      handle: "@urbanboutique",
      followers: "18.2K",
      bio: "Your favorite local style destination. ✨\nNew arrivals weekly. Link in bio to shop!",
      avatar: "/images/retail/avatar.jpg",
      posts: [
        "/images/retail/post1.jpg",
        "/images/retail/post2.jpg",
        "/images/retail/post3.jpg",
        "/images/retail/post4.jpg",
        "/images/retail/post5.jpg",
        "/images/retail/post6.jpg"
      ]
    }
  },
  {
    id: "gyms",
    name: "Gyms & Personal Trainers",
    icon: Dumbbell,
    valueProp: "Fill your classes and boost client rosters. We create high-converting localized social campaigns that turn community awareness into loyal members.",
    ig: {
      handle: "@peakfitness.studio",
      followers: "24.5K",
      bio: "Redefining your limits. 🏋️‍♀️\nJoin the 30-Day Challenge today. 👇",
      avatar: "/images/gyms/avatar.jpg",
      posts: [
        "/images/gyms/post1.jpg",
        "/images/gyms/post2.jpg",
        "/images/gyms/post3.jpg",
        "/images/gyms/post4.jpg",
        "/images/gyms/post5.jpg",
        "/images/gyms/post6.jpg"
      ]
    }
  },
  {
    id: "restaurants",
    name: "Restaurants",
    icon: Utensils,
    valueProp: "Make them hungry before they even arrive. We handle mouth-watering social content and ensure your restaurant dominates local search results.",
    ig: {
      handle: "@bistronine",
      followers: "32.1K",
      bio: "Award-winning local flavor. 🍽️\nOpen daily 11am-10pm. Reserve a table below!",
      avatar: "/images/restaurants/avatar.jpg",
      posts: [
        "/images/restaurants/post1.jpg",
        "/images/restaurants/post2.jpg",
        "/images/restaurants/post3.jpg",
        "/images/restaurants/post4.jpg",
        "/images/restaurants/post5.jpg",
        "/images/restaurants/post6.jpg"
      ]
    }
  },
  {
    id: "educators",
    name: "High-Ticket Coaching / Consulting",
    icon: GraduationCap,
    valueProp: "Position yourself as the undisputed authority. We build SEO-driven content funnels and targeted social authority plays to fill your premium courses.",
    ig: {
      handle: "@coachsmith_official",
      followers: "115K",
      bio: "Helping entrepreneurs scale to 7-figures. 📈\nFree Masterclass this Thursday. Register here:",
      avatar: "/images/educators/avatar.jpg",
      posts: [
        "/images/educators/post1.jpg",
        "/images/educators/post2.jpg",
        "/images/educators/post3.jpg",
        "/images/educators/post4.jpg",
        "/images/educators/post5.jpg",
        "/images/educators/post6.jpg"
      ]
    }
  }
];

export default function SegmentSelector() {
  const [activeSegment, setActiveSegment] = useState<string | null>("retail");

  const activeData = segments.find(s => s.id === activeSegment);

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tailored Strategies for Your Niche
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Select your industry to see how we build your growth engine.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto mb-12">
          {segments.map((segment) => {
            const Icon = segment.icon;
            const isActive = activeSegment === segment.id;
            
            return (
              <motion.button
                key={segment.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSegment(segment.id)}
                className={`p-2 sm:p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all flex flex-col items-center justify-start md:justify-center gap-1.5 md:gap-3 text-center ${
                  isActive 
                    ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-600/20" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                <Icon className={`w-5 h-5 md:w-8 md:h-8 shrink-0 ${isActive ? "text-white" : "text-purple-600"}`} />
                <span className="font-medium text-[9px] sm:text-xs md:text-base leading-tight break-words hyphens-auto">{segment.name}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeData ? (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border-2 border-purple-200 shadow-xl shadow-purple-900/5 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Left Side: Text & Value Prop */}
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-purple-50/50">
                  <div className="hidden md:flex w-12 h-12 bg-purple-100 rounded-xl items-center justify-center mb-6">
                    <activeData.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{activeData.name} Growth Plan</h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {activeData.valueProp}
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm font-medium text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div> Target Audience Identification
                    </li>
                    <li className="flex items-center text-sm font-medium text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div> Platform-Specific Content Creation
                    </li>
                    <li className="flex items-center text-sm font-medium text-slate-700">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-3"></div> Conversion-Optimized Funnels
                    </li>
                  </ul>
                </div>

                {/* Right Side: Mock Instagram Profile */}
                <div className="md:w-1/2 bg-slate-100 p-8 flex items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 relative overflow-hidden">
                  {/* Decorative phone frame shape */}
                  <div className="w-full max-w-[320px] bg-white rounded-[2rem] shadow-2xl border-[6px] border-slate-800 overflow-hidden relative">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20"></div>
                    
                    {/* IG Header */}
                    <div className="pt-8 px-4 pb-4 border-b border-slate-100 bg-white relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-sm tracking-tight">{activeData.ig.handle}</span>
                        <div className="flex gap-1">
                          <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
                          <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
                          <div className="w-1 h-1 bg-slate-900 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full border-2 border-purple-500 p-0.5 overflow-hidden">
                          <img src={activeData.ig.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="flex flex-1 justify-around text-center">
                          <div>
                            <div className="font-bold text-sm">452</div>
                            <div className="text-[10px] text-slate-500">Posts</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{activeData.ig.followers}</div>
                            <div className="text-[10px] text-slate-500">Followers</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">112</div>
                            <div className="text-[10px] text-slate-500">Following</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        <p className="font-bold mb-1">{activeData.name} Expert</p>
                        <p className="whitespace-pre-line text-slate-600">{activeData.ig.bio}</p>
                        <p className="text-blue-600 mt-1">linktr.ee/{activeData.id}growth</p>
                      </div>
                    </div>
                    
                    {/* IG Grid */}
                    <div className="grid grid-cols-3 gap-0.5 bg-white">
                      {activeData.ig.posts.map((imageUrl, i) => (
                        <div key={i} className="aspect-square relative bg-slate-100 overflow-hidden">
                          <img src={imageUrl} alt={`Post ${i+1}`} className="w-full h-full object-cover" />
                          {/* Fake engagement overlay on hover simulation */}
                          <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-black/40 transition-opacity flex items-center justify-center gap-2 text-white text-[10px] font-bold cursor-pointer">
                            <span className="flex items-center"><Heart className="w-3 h-3 mr-1 fill-white" /> 1.2K</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-transparent border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center h-full text-slate-400 py-24"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Store className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-lg font-medium">Click an industry above to reveal a tailored strategy profile.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
