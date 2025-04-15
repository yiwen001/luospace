"use client";
import Experience from "@/components/sphere/Experience";
import Above from "@/components/above";
import About from "@/components/about";
import HorizontalScroll from "@/components/portfolio";
 
 
export default function ClientPage({ portfolio, about }) {

  return (
    <main>
      
      <div className="relative w-screen h-screen">
        <div className="fixed inset-0">
        <Above />  
        </div>
       <Experience />
      </div>

      <div className="relative w-screen h-screen">
        <HorizontalScroll portfolio={portfolio} />
      </div>

      <div className="relative w-screen h-screen">
        <ul>
          {about.map((item, index) => {
            return <About key={index} item={item} />;
          })}
        </ul>
      </div>
      
    

    </main>
  );
}
