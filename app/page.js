import getPortfolio from "@/lib/sanity/getPortfolio";
import getAbout from "@/lib/sanity/getIntro";
import ClientPage from "./ClientPage";

export default async function Home() {
  const portfolio = await getPortfolio();
  const about = await getAbout();

  return <ClientPage portfolio={portfolio} about={about} />;
}
