"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Lock } from "lucide-react";

type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  baseTier: string | null;
  priceRange: { low: number; high: number };
};

export default function LeadCaptureModal({ isOpen, onClose, baseTier, priceRange }: LeadCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [businessType, setBusinessType] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data._subject = "New Lead from Pricing Builder";
    if (baseTier) data.Tier = baseTier;
    if (priceRange) data.EstPrice = `$${priceRange.low} - $${priceRange.high}`;
    
    data._autoresponse = "Hi there,\n\nThank you for reaching out to Digital Growth Engine! We have received your request and our team is currently reviewing your details. One of our growth analysts will contact you shortly to confirm your customized plan.\n\nBest,\nThe Digital Growth Engine Team";

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
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      })
      .catch(error => {
        console.error(error);
        setIsSubmitting(false);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[90vh]"
          >
            <div className="absolute top-4 right-4 z-20 bg-white rounded-full">
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Estimate Reserved!</h3>
                  <p className="text-slate-600">
                    We'll be in touch shortly to schedule your growth diagnostic.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Let's Talk Growth</h3>
                  <p className="text-slate-500 mb-6 text-sm">
                    Reserve your preliminary estimate of ${priceRange.low} - ${priceRange.high}/mo. We will reach out via phone to learn about your specific business needs and customize a final price that makes sense for you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="modalBusinessType" className="block text-sm font-medium text-slate-700 mb-1">
                        Business Type
                      </label>
                      <select
                        id="modalBusinessType"
                        name="businessType"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all bg-white"
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
                          <div>
                            <label htmlFor="modalWebsite" className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
                            <input type="url" name="website" id="modalWebsite" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="https://yourwebsite.com" />
                          </div>
                          
                          <div>
                            <label htmlFor="modalIg" className="block text-sm font-medium text-slate-700 mb-1">Instagram Handle</label>
                            <input type="text" name="instagram" id="modalIg" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="@yourbusiness" />
                          </div>

                          {['restaurant', 'gym', 'retail', 'other'].includes(businessType) && (
                            <div>
                              <label htmlFor="modalAddress" className="block text-sm font-medium text-slate-700 mb-1">Physical Address</label>
                              <input type="text" name="address" id="modalAddress" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="123 Main St, City, ST" />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label htmlFor="bottleneck" className="block text-sm font-medium text-slate-700 mb-1">
                        Biggest Current Marketing Bottleneck?
                      </label>
                      <select
                        id="bottleneck"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option value="" disabled selected>Select an option...</option>
                        <option value="traffic">Not enough traffic/eyeballs</option>
                        <option value="conversion">Traffic doesn't convert to leads/sales</option>
                        <option value="time">No time to manage social/SEO</option>
                        <option value="strategy">No clear strategy</option>
                      </select>
                    </div>

                    {/* Hidden fields for payload */}
                    <input type="hidden" name="baseTier" value={baseTier || ""} />
                    <input type="hidden" name="priceLow" value={priceRange.low} />
                    <input type="hidden" name="priceHigh" value={priceRange.high} />

                    <div className="bg-slate-50 rounded-lg p-4 mt-6 border border-slate-100 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">No payment required today.</strong> You will not be charged the selected amount. Our analyst team will review your request and contact you to confirm a final, customized plan before you pay anything.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 text-white rounded-lg py-3 font-medium hover:bg-purple-700 transition-colors mt-6 flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        "Book Free Consultation"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
