import O from "@/components/icons/O";
import DecryptedText from './DecryptedText'
const Above = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* focus */}
      <div className="absolute left-2 sm:left-4 top-12 sm:top-24">
        <div className="flex flex-col items-start">
          <div className="above">
          <DecryptedText 
            text="f"
            animateOn="view"
            revealDirection="center"
            speed={500}
          />
            <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
            <DecryptedText 
              text="cus"
              animateOn="view"
              revealDirection="center"
              speed={500}
            />
          </div>
          <div className="pl-1 text-xs leading-tight sm:pl-2 sm:text-sm md:text-base lg:text-lg">
            <DecryptedText 
              text="I am currently engaged in AI & WEARABLES" 
              animateOn="view"
              revealDirection="center"
              speed={500}
            />
            <div>
            <DecryptedText 
              text="collaboration is welcome"
              animateOn="view"
              revealDirection="center"
              speed={500}
         
            /></div>
          </div>
        </div>
      </div>

      {/* explore */}
      <div className="absolute right-2 sm:right-4 top-64 sm:top-40 md:top-48 lg:top-60">
        <div className="above">
          <DecryptedText 
            text="expl"
            animateOn="view"
            revealDirection="center"
            speed={500}
          />
          <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
          <DecryptedText 
            text="re"
            animateOn="view"
            revealDirection="center"
            speed={500}
          />
        </div>
      </div>

      {/* break through */}
      <div className="absolute -translate-x-1/2 left-1/2 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24">
        <div className="above whitespace-nowrap">
          <DecryptedText 
          text="break "
          animateOn="view"
          revealDirection="center"
          speed={500}/>
          <DecryptedText 
            text="thr"
            animateOn="view"
            revealDirection="center"
            speed={500}/>

          <O className="w-[80px] h-[48px] sm:w-[140px] sm:h-[80px] md:w-[180px] md:h-[100px] lg:w-[212px] lg:h-[120px]" />
          <DecryptedText 
            text="ugh"
            animateOn="view"
            revealDirection="center"
            speed={500}
          />
        </div>
        <div className="pr-1 text-xs leading-tight sm:pr-2 sm:text-sm md:text-base lg:text-lg text-end">
          <DecryptedText 
            text="This is a portfolio website specialize in"
            animateOn="view"
            revealDirection="center"
            speed={500}
          />
          <div>
              <DecryptedText 
                text="observing and exploring human behavior"
                animateOn="view"
                revealDirection="center"
                speed={500} 
            />        
              </div>
        </div>
      </div>
    </div>
  );
};

export default Above;
