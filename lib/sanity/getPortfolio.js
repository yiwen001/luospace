import { client } from "./index";

const getPortfolio = async () => {
  const query = `
  *[_type == 'portfolio'] | order(releaseDate asc){
    title,
      "slug": slug.current,
      releaseDate,
      category,
      "cover": cover.asset._ref,
      description,
	}`;
  const data = await client.fetch(query);
  return data;
};

export default getPortfolio;
