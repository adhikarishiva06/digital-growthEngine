"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, MessageSquarePlus } from "lucide-react";

const outcomes = [
  {
    id: "discovery",
    benefit: "Rapid Customer Discovery",
    description: "We put your brand in front of thousands of people in your local area who don't follow you yet. Watch your reach explode as we capture new attention every single day.",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "authority",
    benefit: "Unshakable Authority & Trust",
    description: "We position you as the undisputed expert in your niche. By providing high-value insights and showcasing your best work, we make sure prospects choose you over the competition.",
    icon: ShieldCheck,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "retention",
    benefit: "Audience Retention & Lead Generation",
    description: "We don't just get you followers; we keep them engaged. We turn passive scrollers into active community members and trigger direct conversations that lead straight to sales.",
    icon: MessageSquarePlus,
    color: "bg-pink-100 text-pink-600",
  }
];

export default function HowWeHelpSection() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            The Results You Can Expect
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            We don't just post for the sake of posting. Our proprietary system is engineered to deliver three core business outcomes for your agency or local business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {outcomes.map((outcome, index) => {
            const Icon = outcome.icon;
            return (
              <motion.div 
                key={outcome.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col"
              >
                {/* Decorative background shape */}
                <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-20 ${outcome.color.split(' ')[0]}`}></div>
                
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative z-10 ${outcome.color}`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">
                  {outcome.benefit}
                </h3>
                
                <p className="text-slate-600 leading-relaxed relative z-10">
                  {outcome.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
