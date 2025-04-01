import Experience from "@/components/sphere/Experience";
import Above from "@/components/above";
import getPortfolio from "@/lib/sanity/getPortfolio";
import getAbout from "@/lib/sanity/getIntro";
import About from "@/components/about";
import HorizontalScroll from "@/components/portfolio";

// import { getGalaxy } from "@/lib/sanity/getGalaxy";
// import Experience from "@/components/galaxy/Experience";

export default async function Home() {
  const portfolio = await getPortfolio();
  const about = await getAbout();
  // const galaxy = await getGalaxy();
  return (
    <main>
      <Experience />
      <Above />
      <div className="h-screen"></div>
      {/* portfolio */}
      <HorizontalScroll portfolio={portfolio} />
      <div className="h-[200vh]"></div>
      {/* about */}
      <ul>
        {about.map((item, index) => {
          return <About key={index} item={item} />;
        })}
      </ul>
    </main>
  );
}
