import React from "react";
import TableOfContents from "./TableOfContents";
import { slugify } from "@/lib/sanity/utils";

const renderText = (child, markDefs) => {
  // divide text by line breaks
  const textWithLineBreaks = child.text.split("\n").map((text, i, arr) => (
    <React.Fragment key={i}>
      {text}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));

  if (!child?.marks?.length) return textWithLineBreaks;

  return child.marks.reduce((acc, mark) => {
    // check if it is a color mark (by finding in markDefs)
    const colorDef = markDefs?.find(
      (def) => def._key === mark && def._type === "textColor"
    );

    if (colorDef) {
      return (
        <span key={child._key} style={{ color: colorDef.value }}>
          {acc}
        </span>
      );
    }

    // handle other marks
    switch (mark) {
      case "strong":
        return <strong key={child._key}>{acc}</strong>;
      case "em":
        return <em key={child._key}>{acc}</em>;
      case "code":
        return (
          <code key={child._key} className="px-1 bg-gray-100 rounded">
            {acc}
          </code>
        );
      case "underline":
        return <u key={child._key}>{acc}</u>;
      default:
        return acc;
    }
  }, textWithLineBreaks);
};

const ImageCaption = ({ title, value }) => (
  <div className="text-sm font-light text-gray-500">
    <h4 className="mt-4">{title}:</h4>
    <p>{value}</p>
  </div>
);

const ImageSidebar = ({ imageData }) => {
  // 过滤掉 url 和其他不需要显示的字段
  const captionKeys = Object.keys(imageData).filter(
    (key) =>
      key !== "url" && key !== "_type" && key !== "_key" && imageData[key] // 确保值不为空
  );

  return (
    <div className="absolute left-[calc(100%_+_3rem)] top-0 w-52 text-gray-700">
      <div className="w-12 h-px mb-2 bg-gray-400"></div>
      {captionKeys.map((key) => (
        <ImageCaption
          key={key}
          title={key} // 可以在这里格式化标题显示
          value={imageData[key]}
        />
      ))}
    </div>
  );
};

const JsonImage = ({ jsonData }) => (
  <div className="relative max-w-2xl mx-auto my-12">
    <img
      src={jsonData.url}
      alt={jsonData["Image Title"] || ""}
      className="w-full rounded-lg"
    />
    <ImageSidebar imageData={jsonData} />
  </div>
);

const renderBlock = (block) => {
  const { style, children, markDefs } = block;

  switch (block._type) {
    case "block":
      switch (style) {
        case "h2":
          const h2Text = children?.map((child) => child.text).join("");
          const h2Id = slugify(h2Text);
          return (
            <h2
              id={h2Id}
              className="relative mt-8 mb-4 text-3xl font-bold group content"
            >
              <a
                href={`#${h2Id}`}
                className="absolute transition-opacity opacity-0 -left-6 group-hover:opacity-100"
                aria-hidden="true"
              >
                #
              </a>
              {children?.map((child) => renderText(child, markDefs))}
            </h2>
          );
        case "h3":
          const h3Text = children?.map((child) => child.text).join("");
          const h3Id = slugify(h3Text);
          return (
            <h3
              id={h3Id}
              className="relative mt-8 mb-4 text-xl font-bold group content"
            >
              <a
                href={`#${h3Id}`}
                className="absolute transition-opacity opacity-0 -left-6 group-hover:opacity-100"
                aria-hidden="true"
              >
                #
              </a>
              {children?.map((child) => renderText(child, markDefs))}
            </h3>
          );
        case "blockquote":
          return (
            <blockquote className="pl-4 my-4 italic border-l-4 border-gray-200 content">
              {children?.map((child) => renderText(child, markDefs))}
            </blockquote>
          );
        default:
          return (
            <p className="my-4 text-base leading-relaxed content">
              {children?.map((child) => renderText(child, markDefs))}
            </p>
          );
      }

    case "code":
      try {
        const jsonData = JSON.parse(block.code);
        if (jsonData.url) {
          return <JsonImage jsonData={jsonData} />;
        }
      } catch (e) {
        console.error("Failed to parse JSON:", e);
      }
  }
};

const BlockContent = ({ blocks, hasMargin = true }) => {
  return (
    <div className="relative">
      <TableOfContents blocks={blocks} />
      <div className="max-w-2xl mx-auto">
        {blocks?.map((block, index) => (
          <div key={block._key || index}>{renderBlock(block)}</div>
        ))}
      </div>
      {hasMargin && <div className="h-1 block-content-bottom mt-80" />}
    </div>
  );
};

export default BlockContent;
