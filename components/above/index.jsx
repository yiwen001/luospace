"use client";
import O from "@/components/icons/O";
import DecryptedText from './DecryptedText'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Above = () => {
  const [showSmallText, setShowSmallText] = useState(false);

  useEffect(() => {
    // 延迟显示小字
    const timer = setTimeout(() => {
      setShowSmallText(true);
    }, 2000); // 2秒后显示小字

    return () => clearTimeout(timer);
  }, []);

  const scaleVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1
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
              animateOn="view"
              revealDirection="center"
              speed={300}
            />
            <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
            <DecryptedText 
              text="cus"
              animateOn="view"
              revealDirection="center"
              speed={300}
            />
          </motion.div>
          {showSmallText && (
            <div className="pl-1 text-xs leading-tight sm:pl-2 sm:text-sm md:text-base lg:text-lg">
              <DecryptedText 
                text="I am currently engaged in AI & WEARABLES" 
                animateOn="view"
                revealDirection="center"
                speed={50}
              />
              <div>
                <DecryptedText 
                  text="collaboration is welcome"
                  animateOn="view"
                  revealDirection="center"
                  speed={50}
                />
              </div>
            </div>
          )}
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
            animateOn="view"
            revealDirection="center"
            speed={300}
          />
          <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
          <DecryptedText 
            text="re"
            animateOn="view"
            revealDirection="center"
            speed={300}
          />
        </motion.div>
        {showSmallText && (
          <div className="mt-2 text-xs leading-tight sm:text-sm md:text-base lg:text-lg">
            <DecryptedText 
              text="Discover more about my work"
              animateOn="view"
              revealDirection="center"
              speed={50}
            />
          </div>
        )}
      </div>

      {/* break through */}
      <div className="absolute -translate-x-1/2 left-1/2 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24">
        <motion.div 
          className="above whitespace-nowrap"
          initial="initial"
          animate="animate"
          variants={scaleVariants}
        >
          <DecryptedText 
            text="break "
            animateOn="view"
            revealDirection="center"
            speed={300}
          />
          <DecryptedText 
            text="thr"
            animateOn="view"
            revealDirection="center"
            speed={300}
          />
          <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
          <DecryptedText 
            text="ugh"
            animateOn="view"
            revealDirection="center"
            speed={300}
          />
        </motion.div>
        {showSmallText && (
          <div className="pr-1 text-xs leading-tight sm:pr-2 sm:text-sm md:text-base lg:text-lg text-end">
            <DecryptedText 
              text="This is a portfolio website specialize in"
              animateOn="view"
              revealDirection="center"
              speed={50}
            />
            <div>
              <DecryptedText 
                text="observing and exploring human behavior"
                animateOn="view"
                revealDirection="center"
                speed={50}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Above;
