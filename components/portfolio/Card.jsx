import Image from "next/image";
import { getImageInfo } from "@/lib/sanity/utils";
import Link from "next/link";

const Card = ({ item }) => {
  const { title, slug, description, cover, category } = item;
  const { imgUrl, ratio } = getImageInfo(cover);

  return (
    <Link href={`/portfolio/${slug}`} className="flex flex-col items-center">
      <figure style={{ aspectRatio: 2 }} className="relative w-full">
        <Image src={imgUrl} alt={title} fill />
      </figure>
      <h3 className="text-3xl font-[500] mt-8 mb-2">{title}</h3>
      <Description description={description} />
      <p className="mt-4 text-sm italic text-gray-800">{category}</p>
    </Link>
  );
};

const Description = ({ description }) => {
  const maxLineLength = 65; // 第一行最大字符数

  // 将文本按照空格分割成单词数组
  const words = description.split(" ");
  let firstLine = "";
  let secondLine = "";
  let thirdLine = "";
  let currentLength = 0;

  // 构建第一行
  for (let i = 0; i < words.length; i++) {
    if (currentLength + words[i].length <= maxLineLength) {
      firstLine += (firstLine ? " " : "") + words[i];
      currentLength += words[i].length + 1;
    } else {
      // 第二行
      currentLength = 0;
      for (let j = i; j < words.length; j++) {
        if (currentLength + words[j].length <= maxLineLength * 0.78) {
          secondLine += (secondLine ? " " : "") + words[j];
          currentLength += words[j].length + 1;
          i = j;
        } else {
          // 第三行
          thirdLine = words.slice(j).join(" ");
          if (thirdLine.length > maxLineLength * 0.56) {
            thirdLine =
              thirdLine.substring(0, Math.floor(maxLineLength * 0.56)) + "...";
          }
          break;
        }
      }
      break;
    }
  }

  return (
    <p className="text-sm text-center font-[100] text-zinc-500 max-w-[500px]">
      {firstLine}
      <br />
      {secondLine}
      <br />
      {thirdLine}
    </p>
  );
};

export default Card;
