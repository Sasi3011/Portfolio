import { motion } from "framer-motion";
import { Search, Lock, Mic, Camera, X } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Patents() {
  return (
    <Section id="patents">
      <SectionTitle line1="PATENTS &" line2="PUBLICATIONS" align="right" />

      <p className="mt-[-1.5rem] mb-10 max-w-xl text-left text-sm leading-relaxed text-slate-500 sm:text-right sm:text-[15px] md:ml-auto">
        Showcasing intellectual property and innovations recognized by official patent offices.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="w-full max-w-full mt-10"
      >
        {/* Mock Browser Window */}
        <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-2xl flex flex-col text-left">
          
          {/* Browser Top Bar */}
          <div className="flex h-12 items-center gap-4 bg-[#f1f3f4] px-4 border-b border-slate-300">
            {/* Window Controls */}
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
              <div className="h-3 w-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
            </div>
            
            {/* Address Bar */}
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-sm border border-slate-200 mx-4 max-w-3xl">
              <Lock className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-xs text-slate-700 truncate font-sans">
                https://google.com/search?q=Saffron+Cultivation+IoT+Drone+Patent
              </span>
            </div>
          </div>

          {/* Google Search Header Area */}
          <div className="flex flex-col sm:flex-row sm:items-center px-4 py-6 sm:px-8 border-b border-[#ebebeb] gap-4 sm:gap-8">
            <span className="font-sans font-medium text-3xl tracking-tighter shrink-0 select-none">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </span>
            <div className="flex flex-1 items-center w-full max-w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow">
              <span className="flex-1 text-[15px] text-slate-800 outline-none leading-tight whitespace-normal break-words pr-2">
                Integrated IoT and Drone-Based Monitoring for Saffron Cultivation Using Machine Learning patent
              </span>
              <div className="flex items-center gap-3 ml-2 border-l border-slate-200 pl-3">
                <X className="h-5 w-5 text-slate-400 cursor-pointer hover:text-slate-600" />
                <Mic className="h-5 w-5 text-blue-500 cursor-pointer hidden sm:block" />
                <Camera className="h-5 w-5 text-blue-500 cursor-pointer hidden sm:block" />
                <Search className="h-5 w-5 text-blue-500 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Search Tools/Nav Bar */}
          <div className="flex items-center gap-6 px-4 sm:px-8 pt-2 pb-0 border-b border-[#ebebeb] text-[13px] text-[#4d5156]">
            <div className="flex items-center gap-1 pb-2 border-b-[3px] border-[#1a0dab] text-[#1a0dab] font-medium cursor-pointer">
              <Search className="h-4 w-4" /> All
            </div>
            <div className="flex items-center gap-1 pb-2 border-b-[3px] border-transparent hover:text-slate-800 cursor-pointer">
              Images
            </div>
            <div className="flex items-center gap-1 pb-2 border-b-[3px] border-transparent hover:text-slate-800 cursor-pointer">
              News
            </div>
            <div className="flex items-center gap-1 pb-2 border-b-[3px] border-transparent hover:text-slate-800 cursor-pointer">
              Videos
            </div>
          </div>

          {/* Google Search Result Style Container */}
          <div className="flex flex-col gap-1 py-6 px-4 sm:px-8 hover:bg-slate-50/50 transition-colors cursor-pointer group">
            <p className="text-[13px] text-[#70757a] mb-2">About 1 result (0.24 seconds)</p>
            
            {/* Breadcrumb / URL */}
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 border border-slate-200 shrink-0">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-600" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" />
                </svg>
              </div>
              <div className="flex flex-col leading-snug">
                <span className="text-[14px] text-[#202124]">Google Patents</span>
                <span className="text-[12px] text-[#4d5156]">https://patents.google.com › patent › IN202541084158</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[20px] sm:text-[22px] font-normal text-[#1a0dab] group-hover:underline leading-tight mt-2 w-full">
              Integrated IoT and Drone-Based Monitoring for Saffron Cultivation Using Machine Learning
            </h3>

            {/* Meta & Snippet */}
            <div className="text-[14px] text-[#4d5156] leading-relaxed mt-1 w-full">
              <span className="text-[#70757a]">Sep 4, 2025 — </span>
              A comprehensive system and method for the automated monitoring of saffron cultivation leveraging integrated Internet of Things (IoT) sensors and drone-based aerial surveillance. The framework utilizes advanced machine learning algorithms to process crop health...
            </div>

            {/* Rich Snippet Details */}
            <div className="mt-2.5 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[14px] text-[#4d5156] w-full">
              <div>
                <span className="text-[#70757a]">Inventors:</span> <span className="text-[#1a0dab] hover:underline cursor-pointer">Sasikiran T.T.</span>, <span className="text-[#1a0dab] hover:underline cursor-pointer">Sanjana B</span>, <span className="text-[#1a0dab] hover:underline cursor-pointer">Surya P</span>, <span className="text-[#1a0dab] hover:underline cursor-pointer">Yuvaraj Sir</span>
              </div>
              <div>
                <span className="text-[#70757a]">Application No:</span> 202541084158
              </div>
              <div>
                <span className="text-[#70757a]">Status:</span> Published (Indian Patent Office)
              </div>
            </div>

          </div>
          
          <div className="h-12 bg-white"></div> {/* Bottom buffer padding */}

        </div>
      </motion.div>
    </Section>
  );
}
