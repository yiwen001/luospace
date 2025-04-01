import { client } from "./index";

export const getContent = async (slug) => {
  const query = `
  *[_type == 'portfolio' && slug.current == '${slug}'][0]{
      content,
        researchTopics,
        "contributors": contributors[]{
          "avatar": avatar.asset._ref,
          role,
          name,
          intro,
          mail,
          ins,
          redbook
        }
  }
  `;
  const data = await client.fetch(query);
  return data;
};
