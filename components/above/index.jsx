"use client";
import O from "@/components/icons/O";
import DecryptedText from './DecryptedText'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Above = () => {
  const [showSmallText, setShowSmallText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSmallText(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const scaleVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* focus */}
      <div className="absolute left-2 sm:left-4 top-12 sm:top-24">
        <div className="flex flex-col items-start">
          <motion.div 
            className="above"
            initial="initial"
            animate="animate"
            variants={scaleVariants}
          >
            <DecryptedText 
              text="f"
              speed={100}
              maxIterations={5}
            />
            <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
            <DecryptedText 
              text="cus"
              speed={100}
              maxIterations={5}
            />
          </motion.div>
          <div className={`pl-1 text-xs leading-tight sm:pl-2 sm:text-sm md:text-base lg:text-lg transition-opacity duration-300 ${showSmallText ? 'opacity-100' : 'opacity-0'}`}>
            <DecryptedText 
              text="I am currently engaged in AI & WEARABLES"
              speed={50}
              maxIterations={8}
            />
            <div>
              <DecryptedText 
                text="collaboration is welcome"
                speed={50}
                maxIterations={8}
              />
            </div>
          </div>
        </div>
      </div>

      {/* explore */}
      <div className="absolute right-2 sm:right-4 top-64 sm:top-40 md:top-48 lg:top-60">
        <motion.div 
          className="above"
          initial="initial"
          animate="animate"
          variants={scaleVariants}
        >
          <DecryptedText 
            text="expl"
            speed={100}
            maxIterations={5}
          />
          <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
          <DecryptedText 
            text="re"
            speed={100}
            maxIterations={5}
          />
        </motion.div>
        <div className={`mt-2 text-xs leading-tight sm:text-sm md:text-base lg:text-lg transition-opacity duration-300 ${showSmallText ? 'opacity-100' : 'opacity-0'}`}>
          <DecryptedText 
            text="Discover more about my work"
            speed={50}
            maxIterations={8}
          />
        </div>
      </div>

      {/* break through */}
      <div className="absolute -translate-x-1/2 left-1/2 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24">
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="above whitespace-nowrap"
            initial="initial"
            animate="animate"
            variants={scaleVariants}
          >
            <DecryptedText 
              text="break "
              speed={100}
              maxIterations={5}
            />
            <DecryptedText 
              text="thr"
              speed={100}
              maxIterations={5}
            />
            <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
            <DecryptedText 
              text="ugh"
              speed={100}
              maxIterations={5}
            />
          </motion.div>
          <div className={`w-full text-end transition-opacity duration-300 ${showSmallText ? 'opacity-100' : 'opacity-0'}`}>
            <div className="pr-1 text-xs leading-tight sm:pr-2 sm:text-sm md:text-base lg:text-lg">
              <DecryptedText 
                text="This is a portfolio website specialize in"
                speed={50}
                maxIterations={8}
              />
              <div>
                <DecryptedText 
                  text="observing and exploring human behavior"
                  speed={50}
                  maxIterations={8}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Above;
