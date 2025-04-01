import { getImageInfo } from "@/lib/sanity/utils";
import Image from "next/image";

const Contributors = ({ contributors }) => {
  return (
    <section>
      <ul className="flex gap-12 mt-24">
        {contributors.map((contributor) => {
          const { name, avatar, role, intro, mail, ins, redbook } = contributor;
          const { imgUrl, ratio } = getImageInfo(avatar);
          return (
            <li
              key={name}
              className="p-4 border border-gray-600 max-w-64 rounded-3xl"
            >
              <figure
                style={{ aspectRatio: ratio }}
                className="relative w-full h-auto"
              >
                <Image src={imgUrl} alt={name} fill />
              </figure>
              <p className="mt-2 text-xs italic text-gray-800">{role}</p>
              <h4 className="mb-2 text-sm font-semibold">{name}</h4>
              <p className="text-xs text-gray-800">{intro}</p>
              <ul className="flex flex-col mt-16 text-xs">
                <li>
                  <a href={`mailto:${mail}`}>mail: {mail}</a>
                </li>
                <li>
                  <div>Ins: {ins}</div>
                </li>
                <li>
                  <div>Redbook: {redbook}</div>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Contributors;
