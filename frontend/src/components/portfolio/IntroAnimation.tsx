import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Lock scrolling during animation
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 1200); // Faster duration before the overlay splits
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Top-left Triangle */}
          <motion.div
            key="triangle-tl"
            initial={{ x: 0, y: 0 }}
            exit={{ 
              x: "-50vw", 
              y: "-50vh", 
              opacity: 0,
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="absolute inset-0 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
          
          {/* Bottom-right Triangle */}
          <motion.div
            key="triangle-br"
            initial={{ x: 0, y: 0 }}
            exit={{ 
              x: "50vw", 
              y: "50vh", 
              opacity: 0,
              transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
            }}
            className="absolute inset-0 bg-white"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          >
            {/* Logo positioned at bottom right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-12 right-16"
            >
              <div className="relative inline-flex items-center justify-center pt-8 pr-4">
                {/* Top left orange loops */}
                <div className="absolute left-2 top-0 flex items-center">
                  <div className="h-[24px] w-[24px] rounded-full border-[4px] border-[#f59e0b]" />
                  <div className="-ml-2.5 h-[24px] w-[24px] rounded-full border-[4px] border-[#f59e0b]" />
                </div>
                
                {/* Top right blue/black circle */}
                <div className="absolute right-6 top-1 h-[22px] w-[22px] overflow-hidden rounded-full">
                  <div className="absolute inset-0 w-1/2 bg-[#0ea5e9]" />
                  <div className="absolute inset-0 left-1/2 w-1/2 bg-[#111827]" />
                </div>

                {/* Sasi text - Dark for light background */}
                <span className="hero-headline text-[80px] font-extrabold tracking-tight text-[#111827] leading-none">
                  Sasi
                </span>
                {/* Pink dot */}
                <span className="hero-headline text-[80px] font-extrabold text-[#f43f5e] leading-none">
                  .
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
