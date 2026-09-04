"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [businessType, setBusinessType] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [otherText, setOtherText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data._subject = "New Lead from Contact Form";
    data._autoresponse = "Hi there,\n\nThank you for reaching out to Digital Growth Engine! We have received your inquiry. One of our growth analysts will be in touch with you shortly to schedule a quick chat.\n\nBest,\nThe Digital Growth Engine Team";

    fetch("https://formsubmit.co/ajax/digigrowthengine@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        setFormState("success");
      })
      .catch(error => {
        console.error(error);
        setFormState("idle");
      });
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Side: Strategic Copy & Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Ready to Stop <span className="text-purple-600">Guessing?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              You excel at running your business. We excel at putting your business in front of people who want to buy. Stop wasting time trying to figure out algorithms and ad platforms. Let's have a 15-minute chat to see if we're a fit.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <a href="tel:+19165079807" className="text-lg font-bold text-slate-900 hover:text-purple-600 transition-colors">(916) 507-9807</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <a href="mailto:digigrowthengine@gmail.com" className="text-lg font-bold text-slate-900 hover:text-purple-600 transition-colors break-all">digigrowthengine@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">Schaumburg, IL (Remote-First)</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-100/50 border border-purple-200 rounded-xl p-5 inline-block">
              <p className="text-sm text-purple-900 font-medium">
                💡 <strong className="font-bold">Pro Tip:</strong> Already know what you need? Use the <a href="#pricing-builder" className="underline hover:text-purple-700 font-bold">diagnostic</a> above to request a custom proposal instantly.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Lead Capture Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8"
          >
            {formState === "success" ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 mx-auto" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Request Received!</h3>
                <p className="text-slate-600 mb-8">
                  One of our growth analysts will review your details and reach out to you at the number provided within 24 hours.
                </p>
                <button 
                  onClick={() => setFormState("idle")}
                  className="text-purple-600 font-semibold hover:text-purple-800 transition-colors"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Book a Discovery Call</h3>
                  <p className="text-sm text-slate-500">Fill out the form below and we'll reach out to schedule a quick chat.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">First Name</label>
                    <input required type="text" id="firstName" name="firstName" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">Work Email</label>
                  <input required type="email" id="email" name="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" placeholder="john@yourbusiness.com" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</label>
                  <input required type="tel" name="phone" id="phone" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" placeholder="(555) 000-0000" />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="businessType" className="text-sm font-semibold text-slate-700">Business Type</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700"
                  >
                    <option value="" disabled>Select your industry...</option>
                    <option value="restaurant">Restaurant / Cafe</option>
                    <option value="gym">Gym / Fitness Studio</option>
                    <option value="retail">Local Retail / Storefront</option>
                    <option value="ecommerce">E-Commerce / Online Store</option>
                    <option value="coaching">High-Ticket Coaching / Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <AnimatePresence mode="popLayout">
                  {businessType && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden pt-1"
                    >
                      <div className="space-y-1.5">
                        <label htmlFor="website" className="text-sm font-semibold text-slate-700">Website URL</label>
                        <input type="url" name="website" id="website" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" placeholder="https://yourwebsite.com" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label htmlFor="ig" className="text-sm font-semibold text-slate-700">Instagram Handle</label>
                        <input type="text" name="instagram" id="ig" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" placeholder="@yourbusiness" />
                      </div>

                      {['restaurant', 'gym', 'retail', 'other'].includes(businessType) && (
                        <div className="space-y-1.5">
                          <label htmlFor="address" className="text-sm font-semibold text-slate-700">Physical Address (For Local SEO)</label>
                          <input type="text" name="address" id="address" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all" placeholder="123 Main St, City, ST" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-1.5 mt-4">
                  <label htmlFor="bottleneck" className="text-sm font-semibold text-slate-700">Biggest Marketing Bottleneck?</label>
                  <select 
                    id="bottleneck" 
                    name="bottleneck"
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-700"
                  >
                    <option value="" disabled>Select an option...</option>
                    <option value="traffic">Not enough foot traffic / leads</option>
                    <option value="conversion">Getting leads, but they don't convert</option>
                    <option value="retention">Customers buy once and don't come back</option>
                    <option value="time">I don't have time to manage marketing</option>
                    <option value="other">Other (Please specify)</option>
                  </select>
                </div>

                <AnimatePresence>
                  {bottleneck === "other" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: "auto" }} 
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label htmlFor="otherDetails" className="text-sm font-semibold text-slate-700">Please describe briefly</label>
                      <textarea 
                        id="otherDetails" 
                        name="otherDetails"
                        maxLength={500}
                        rows={3}
                        value={otherText}
                        onChange={(e) => setOtherText(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none" 
                        placeholder="Tell us what's holding you back..." 
                      />
                      <div className="text-xs text-right text-slate-400">
                        {otherText.length}/500
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-3.5 font-semibold transition-all mt-4 disabled:opacity-70"
                >
                  {formState === "submitting" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Send Request <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-slate-400 mt-3">We respect your privacy. No spam ever.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
