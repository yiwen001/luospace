import { getContent } from "@/lib/sanity/getContent";
import ResearchTopics from "@/components/portfolio/content/ResearchTopics";
import Contributors from "@/components/portfolio/content/Contributors";
import BlockContent from "@/components/portfolio/content/BlockContent";

const page = async ({ params }) => {
  const { slug } = await params;
  const content = await getContent(slug);
  return (
    <article className="p-6">
      <BlockContent blocks={content.content} />
      <ResearchTopics topics={content.researchTopics} />
      <Contributors contributors={content.contributors} />
    </article>
  );
};

export default page;
