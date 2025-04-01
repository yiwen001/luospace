import { client } from "./index";

export const getGalaxy = async () => {
  const query = `
    *[_type == 'galaxy'] {
      title,
        creator,
        guide,
        "mineral": {
          "model": mineral.model.asset->url,
          "scale": mineral.scale
        },
        "board": {
          "model": board.model.asset->url,
          "scale": board.scale
        },
        images[]{
            "image": asset._ref
        }
    }
  `;
  const data = await client.fetch(query);

  console.log(data);

  return data;
};
