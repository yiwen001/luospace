import { getImageInfo } from "@/lib/sanity/utils";
import BlockContent from "@/components/portfolio/content/BlockContent";
import Image from "next/image";

const About = ({ item }) => {
  const { title, image, description, keyPoints, name, university, major } =
    item;
  const { imgUrl, ratio } = getImageInfo(image);

  return (
    <section className="h-fit mb-[30vh] px-4 md:px-8 grid grid-cols-22 z-[100]">
      {/* key points */}
      <div className="col-span-full md:col-span-4 h-fit border border-black py-6 px-[14px]">
        <ul className="space-y-1.5">
          {keyPoints.map((item, index) => {
            const { mainPoint, subPoint } = item;
            return (
              <li key={index} className="space-y-1">
                <div className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-gray-900 dark:bg-gray-100 rounded-full shrink-0 mt-[0.7em]" />
                  <div className="font-medium leading-[1.75]">{mainPoint}</div>
                </div>
                <div className="ml-3 space-y-1">
                  {Array.isArray(subPoint) &&
                    subPoint.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-1.5 text-sm text-gray-500"
                      >
                        <span className="w-1 h-1 bg-gray-400 rounded-full shrink-0 mt-[0.75em]" />
                        <span className="leading-[1.75]">{point.trim()}</span>
                      </div>
                    ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="col-span-full md:col-span-1 h-fit"></div>

      {/* description */}
      <div className="col-span-full md:col-span-12">
        <div className="space-y-6 min-h-[50vh] border border-black p-2 px-10">
          <BlockContent blocks={description} hasMargin={false} />
        </div>
        <div className="p-10 py-6 mt-20 space-y-1 border border-black">
          <div className="italic font-medium underline underline-offset-4">
            {major}
          </div>
          <div className="text-5xl tracking-tight">{name || university}</div>
        </div>
      </div>

      <div className="col-span-full md:col-span-1 h-fit"></div>

      {/* image */}
      <div className="col-span-full md:col-span-3 h-fit">
        <figure
          className="relative w-40 mx-auto md:w-full"
          style={{ aspectRatio: ratio }}
        >
          <Image src={imgUrl} alt={title} fill className="object-cover" />
        </figure>
      </div>
    </section>
  );
};

export default About;
