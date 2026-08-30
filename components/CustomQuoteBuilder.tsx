"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Send, PlayCircle, Image as ImageIcon, History } from "lucide-react";

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <defs>
      <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect width="24" height="24" rx="5" fill="url(#ig-grad)" />
    <path fill="#fff" d="M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zm0 9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
    <circle fill="#fff" cx="17.5" cy="6.5" r="1.5" />
    <path fill="#fff" d="M17.5 4h-11C4.57 4 3 5.57 3 7.5v9C3 18.43 4.57 20 6.5 20h11c1.93 0 3.5-1.57 3.5-3.5v-9C21 5.57 19.43 4 17.5 4zm1.5 12.5c0 .83-.67 1.5-1.5 1.5h-11c-.83 0-1.5-.67-1.5-1.5v-9c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5v9z" />
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path fill="#fff" d="M15.4 12H13v9.8c-.6.1-1.3.2-2 .2s-1.4-.1-2-.2V12H7.2V9.4H9V7.6C9 5.8 10 4.2 12.6 4.2c.8 0 1.6.1 2.3.2v2.5h-1.6c-1.2 0-1.5.6-1.5 1.4v1.2h3.2l-.6 2.5z" />
  </svg>
);

const TikTokIcon = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect width="24" height="24" rx="5" fill="#000000" />
    <path fill="#fff" d="M12.53 2.03c-1.31-.03-2.74.09-3.92.38v4.2c.55-.1 1.13-.14 1.71-.14 1.41 0 2.59.76 3.12 1.82v5.4c0 3.16-2.72 5.73-6.08 5.73-3.36 0-6.08-2.57-6.08-5.73s2.72-5.74 6.08-5.74c.31 0 .62.02.92.06v4.1c-.29-.09-.6-.13-.92-.13-1.68 0-3.04 1.28-3.04 2.86 0 1.59 1.36 2.87 3.04 2.87 1.68 0 3.04-1.28 3.04-2.87V2h3.59c.33 1.49 1.38 2.66 2.76 3.18V7.27a6.29 6.29 0 0 1-4.22-1.47V2.03z"/>
  </svg>
);

type Platform = "instagram" | "facebook" | "tiktok";
type ContentType = "reels" | "posts" | "stories";

type Config = {
  platforms: Platform[];
  deliverables: {
    [key in Platform]?: {
      types: ContentType[];
      frequency: string;
    };
  };
};

const platformsList: { id: Platform; name: string; icon: any; color: string }[] = [
  { id: "instagram", name: "Instagram", icon: InstagramIcon, color: "bg-pink-50 border-pink-200" },
  { id: "facebook", name: "Facebook", icon: FacebookIcon, color: "bg-blue-50 border-blue-200" },
  { id: "tiktok", name: "TikTok", icon: TikTokIcon, color: "bg-slate-100 border-slate-300" },
];

const contentTypes = [
  { id: "reels", name: "Reels / Shorts", icon: PlayCircle },
  { id: "posts", name: "Static / Carousel", icon: ImageIcon },
  { id: "stories", name: "Stories", icon: History },
];

export default function CustomQuoteBuilder() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Config>({ platforms: [], deliverables: {} });
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "", business: "" });

  const togglePlatform = (platform: Platform) => {
    setConfig(prev => {
      const isSelected = prev.platforms.includes(platform);
      const newPlatforms = isSelected 
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      
      const newDeliverables = { ...prev.deliverables };
      if (!isSelected && !newDeliverables[platform]) {
        newDeliverables[platform] = { types: ["reels"], frequency: "3" };
      } else if (isSelected) {
        delete newDeliverables[platform];
      }

      return { platforms: newPlatforms, deliverables: newDeliverables };
    });
  };

  const toggleContentType = (platform: Platform, type: ContentType) => {
    setConfig(prev => {
      const platformConfig = prev.deliverables[platform];
      if (!platformConfig) return prev;

      const isSelected = platformConfig.types.includes(type);
      const newTypes = isSelected
        ? platformConfig.types.filter(t => t !== type)
        : [...platformConfig.types, type];

      return {
        ...prev,
        deliverables: {
          ...prev.deliverables,
          [platform]: { ...platformConfig, types: newTypes }
        }
      };
    });
  };

  const setFrequency = (platform: Platform, freq: string) => {
    setConfig(prev => ({
      ...prev,
      deliverables: {
        ...prev.deliverables,
        [platform]: { ...prev.deliverables[platform]!, frequency: freq }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Format the complex object into a readable string for the email
    let formattedOrder = "--- CUSTOM QUOTE BUILDER ---\n\n";
    config.platforms.forEach(p => {
      const deliv = config.deliverables[p];
      if (deliv) {
        formattedOrder += `Platform: ${p.toUpperCase()}\n`;
        formattedOrder += `- Frequency: ${deliv.frequency}x per week\n`;
        formattedOrder += `- Content Types: ${deliv.types.join(", ")}\n\n`;
      }
    });

    const payload = {
      _subject: `New Custom Quote Request from ${contactInfo.name}`,
      Name: contactInfo.name,
      Email: contactInfo.email,
      Phone: contactInfo.phone,
      Business: contactInfo.business,
      Configuration: formattedOrder,
    };

    fetch("https://formsubmit.co/ajax/digigrowthengine@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(() => setFormState("success"))
      .catch(err => {
        console.error(err);
        setFormState("idle");
      });
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
      {/* Progress Header */}
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Custom Growth Engine</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Build your tailored content strategy</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-2.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-purple-600' : 'w-2.5 bg-slate-200'}`} />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 md:p-12 relative overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PLATFORMS */}
          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <div className="text-center max-w-lg mx-auto mb-10">
                <h3 className="text-3xl font-black text-slate-900 mb-4">Choose Your Battlegrounds</h3>
                <p className="text-slate-600">Where does your ideal audience spend their time? Select the primary channels you want to dominate.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {platformsList.map(p => {
                  const isSelected = config.platforms.includes(p.id);
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all group ${
                        isSelected ? `border-purple-600 bg-purple-50 shadow-md` : `border-slate-200 hover:border-purple-200 bg-white`
                      }`}
                    >
                      <div className={`absolute top-4 right-4 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-purple-600 border-purple-600' : 'border-slate-300'}`}>
                        {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                      </div>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${isSelected ? p.color : 'bg-slate-50 opacity-50 grayscale hover:grayscale-0 hover:opacity-100'}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className={`text-lg font-bold ${isSelected ? 'text-purple-900' : 'text-slate-700'}`}>{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DELIVERABLES */}
          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10 pb-20">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-3xl font-black text-slate-900 mb-4">Build Your Engine</h3>
                <p className="text-slate-600">Consistency is the ultimate growth hack. Configure the content mix and frequency for each platform.</p>
              </div>

              <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 pb-4">
                {config.platforms.map(platform => {
                  const pData = platformsList.find(p => p.id === platform)!;
                  const Icon = pData.icon;
                  const deliv = config.deliverables[platform]!;

                  return (
                    <div key={platform} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${pData.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900">{pData.name} Strategy</h4>
                      </div>

                      <div className="space-y-8">
                        {/* Content Types */}
                        <div>
                          <p className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Content Formats</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {contentTypes.map(ct => {
                              const isSelected = deliv.types.includes(ct.id as ContentType);
                              const TypeIcon = ct.icon;
                              return (
                                <button
                                  key={ct.id}
                                  onClick={() => toggleContentType(platform, ct.id as ContentType)}
                                  className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                                    isSelected ? 'bg-white border-purple-600 shadow-sm' : 'bg-white border-slate-200 hover:border-purple-300'
                                  }`}
                                >
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-500'}`}>
                                    <TypeIcon className="w-4 h-4" />
                                  </div>
                                  <span className={`text-sm font-semibold leading-tight ${isSelected ? 'text-purple-900' : 'text-slate-700'}`}>{ct.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Frequency */}
                        <div>
                          <p className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Weekly Posting Frequency</p>
                          <div className="flex bg-white border border-slate-200 rounded-xl overflow-hidden p-1">
                            {["1", "3", "5", "7"].map(freq => {
                              const isSelected = deliv.frequency === freq;
                              return (
                                <button
                                  key={freq}
                                  onClick={() => setFrequency(platform, freq)}
                                  className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all ${
                                    isSelected ? 'bg-purple-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  {freq}x / Week
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: LEAD CAPTURE */}
          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="max-w-md mx-auto py-8">
              {formState === "success" ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">Strategy Received!</h3>
                  <p className="text-slate-600 text-lg">
                    We've received your custom configuration. We'll review your selections and reach out within 24 hours to discuss execution.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Lock In Your Strategy</h3>
                    <p className="text-slate-600">Enter your details below so we can analyze your profiles and prepare your custom quote.</p>
                  </div>

                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input required type="text" value={contactInfo.name} onChange={e => setContactInfo({...contactInfo, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Business Name</label>
                      <input required type="text" value={contactInfo.business} onChange={e => setContactInfo({...contactInfo, business: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" placeholder="Acme Corp" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input required type="email" value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                      <input required type="tel" value={contactInfo.phone} onChange={e => setContactInfo({...contactInfo, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none" placeholder="(555) 123-4567" />
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      {formState !== "success" && (
        <div className="bg-slate-50 border-t border-slate-100 p-6 px-8 flex items-center justify-between mt-auto relative z-20">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold px-4 py-2 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && config.platforms.length === 0}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={formState === "submitting" || !contactInfo.name || !contactInfo.email || !contactInfo.business}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30"
            >
              {formState === "submitting" ? "Sending..." : "Request Quote"} <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
