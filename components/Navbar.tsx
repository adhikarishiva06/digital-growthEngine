"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-black tracking-tighter text-slate-900 leading-none flex flex-col">
          <span className="text-lg">Digital</span>
          <span className="text-purple-600 text-xl">GrowthEngine</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-purple-600 transition-colors py-2">
              Services <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 w-48 bg-white border border-slate-100 shadow-xl rounded-xl py-2 overflow-hidden"
                >
                  <a href="/#services" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition-colors">Social Media Management</a>
                  <a href="/#services" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition-colors">Local SEO</a>
                  <a href="/#services" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition-colors">AI SEO</a>
                  <a href="/#services" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition-colors">Paid Ads (Meta/Google)</a>
                  <a href="/#services" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition-colors">Email Marketing</a>
                  <div className="border-t border-slate-100 my-1"></div>
                  <a href="/custom-quote" className="block px-4 py-2 hover:bg-purple-50 hover:text-purple-600 transition-colors">Build Custom Package</a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="/#results" className="hover:text-purple-600 transition-colors">Results</a>
          <a href="/#pricing-builder" className="hover:text-purple-600 transition-colors">Pricing</a>
          <a href="/#contact" className="hover:text-purple-600 transition-colors">Contact</a>
          <button 
            onClick={() => {
              document.getElementById("pricing-builder")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors font-semibold shadow-md shadow-purple-600/20"
          >
            Get My Diagnostic
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-4 text-sm font-medium text-slate-600">
              <div className="space-y-2">
                <div className="text-slate-900 font-bold px-2">Services</div>
                <div className="pl-4 space-y-2 flex flex-col">
                  <a href="/#services" className="hover:text-purple-600 p-2" onClick={() => setIsMobileMenuOpen(false)}>Social Media Management</a>
                  <a href="/#services" className="hover:text-purple-600 p-2" onClick={() => setIsMobileMenuOpen(false)}>Local SEO</a>
                  <a href="/#services" className="hover:text-purple-600 p-2" onClick={() => setIsMobileMenuOpen(false)}>AI SEO</a>
                  <a href="/#services" className="hover:text-purple-600 p-2" onClick={() => setIsMobileMenuOpen(false)}>Paid Ads (Meta/Google)</a>
                  <a href="/#services" className="hover:text-purple-600 p-2" onClick={() => setIsMobileMenuOpen(false)}>Email Marketing</a>
                  <div className="border-t border-slate-100 my-1"></div>
                  <a href="/custom-quote" className="hover:text-purple-600 p-2" onClick={() => setIsMobileMenuOpen(false)}>Build Custom Package</a>
                </div>
              </div>
              <a href="/#results" className="px-2 hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>Results</a>
              <a href="/#pricing-builder" className="px-2 hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
              <a href="/#contact" className="px-2 hover:text-purple-600" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById("pricing-builder")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-purple-600 text-white px-5 py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
              >
                Get My Diagnostic
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
