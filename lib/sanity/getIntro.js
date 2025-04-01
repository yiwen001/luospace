import { client } from "./index";

const getAbout = async () => {
  const query = `
  *[_type == 'about'] | order(
    select(
      title == "about" => 0,
      title == "bachelor" => 1,
      title == "master" => 2,
      3
    )
  ) {
    title,
    "image": image.asset._ref,
    keyPoints,
    description,
    name,
    university,
    major
  }`;

  const data = await client.fetch(query);
  return data;
};

export default getAbout;
