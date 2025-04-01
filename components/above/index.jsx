import O from "@/components/icons/O";

const Above = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* focus */}
      <div className="absolute left-2 sm:left-4 top-12 sm:top-24">
        <div className="flex flex-col items-start">
          <div className="above">
            f
            <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
            cus
          </div>
          <div className="pl-1 text-xs leading-tight sm:pl-2 sm:text-sm md:text-base lg:text-lg">
            I am currently engaged in AI & WEARABLES
            <div>collaboration is welcome</div>
          </div>
        </div>
      </div>

      {/* explore */}
      <div className="absolute right-2 sm:right-4 top-64 sm:top-40 md:top-48 lg:top-60">
        <div className="above">
          expl
          <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
          re
        </div>
      </div>

      {/* break through */}
      <div className="absolute -translate-x-1/2 left-1/2 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24">
        <div className="above whitespace-nowrap">
          break thr
          <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
          ugh
        </div>
        <div className="pr-1 text-xs leading-tight sm:pr-2 sm:text-sm md:text-base lg:text-lg text-end">
          This is a portfolio website specialize in
          <div>observing and exploring human behavior</div>
        </div>
      </div>
    </div>
  );
};

export default Above;
