"use client";
import O from "@/components/icons/O";
import DecryptedText from './DecryptedText'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Above = () => {
  const [showSmallText, setShowSmallText] = useState(false);
  const [showSplitText, setShowSplitText] = useState(false);
  const [showExploreSplit, setShowExploreSplit] = useState(false);
  const [showBreakthroughSplit, setShowBreakthroughSplit] = useState(false);
  const [startOAnimation, setStartOAnimation] = useState(false);
  const [startExploreOAnimation, setStartExploreOAnimation] = useState(false);
  const [startBreakthroughOAnimation, setStartBreakthroughOAnimation] = useState(false);

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
            {!showSplitText ? (
              <DecryptedText 
                text="focus"
                speed={70}
                maxIterations={20}
                onAnimationComplete={() => {
                  setShowSplitText(true);
                  setTimeout(() => setStartOAnimation(true), 100);
                }}
              />
            ) : (
              <div className="flex items-center">
                <span>f</span>
                <div className="relative">
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                    initial={{ scaleY: 1, opacity: 1 }}
                    animate={startOAnimation ? { scaleX: 2, scaleY: 0.5, opacity: 0 } : { scaleY: 1 , opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ transformOrigin: "center" }}
                  >
                    O
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={startOAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                    className="flex items-end"
                  >
                    <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px] translate-y-[0.01em]" />
                  </motion.div>
                </div>
                <motion.span
                  initial={{ x: 0 }}
                  animate={startOAnimation ? { x: "0.8rem" } : { x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
                >
                  cus
                </motion.span>
              </div>
            )}
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
          {!showExploreSplit ? (
            <DecryptedText 
              text="explore"
              speed={70}
              maxIterations={20}
              onAnimationComplete={() => {
                setShowExploreSplit(true);
                setTimeout(() => setStartExploreOAnimation(true), 100);
              }}
            />
          ) : (
            <div className="flex items-center">
              <span>expl</span>
              <div className="relative">
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                  initial={{ scaleY: 1, opacity: 1 }}
                  animate={startExploreOAnimation ? { scaleX: 2, scaleY: 0.5, opacity: 0  } : { scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ transformOrigin: "center" }}
                >
                  o
                </motion.span>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={startExploreOAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                  className="flex items-end"
                >
                  <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px] translate-y-[0.01em]" />
                </motion.div>
              </div>
              <motion.span
                initial={{ x: 0 }}
                animate={startExploreOAnimation ? { x: "0.8rem" } : { x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
              >
                re
              </motion.span>
            </div>
          )}
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
            {!showBreakthroughSplit ? (
              <DecryptedText 
                text="breakthrough"
                speed={70}
                maxIterations={20}
                onAnimationComplete={() => {
                  setShowBreakthroughSplit(true);
                  setTimeout(() => setStartBreakthroughOAnimation(true), 100);
                }}
              />
            ) : (
              <div className="flex items-center">
                <span>breakth</span>
                <div className="relative">
                  <motion.span
                    className="absolute inset-0 flex items-center justify-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
                    initial={{ scaleY: 1, opacity: 1 }}
                    animate={startBreakthroughOAnimation ? { scaleX: 2, scaleY: 0.5, opacity: 0 } : { scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ transformOrigin: "center" }}
                  >
                    o
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={startBreakthroughOAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                    className="flex items-end"
                  >
                    <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px] translate-y-[0.01em]" />
                  </motion.div>
                </div>
                <motion.span
                  initial={{ x: 0 }}
                  animate={startBreakthroughOAnimation ? { x: "0.8rem" } : { x: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
                >
                  ugh
                </motion.span>
              </div>
            )}
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
