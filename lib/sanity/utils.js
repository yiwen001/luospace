export function getImageInfo(url) {
  const extension = url.substring(url.lastIndexOf("-") + 1);
  const fileNameRegex = new RegExp("image-(.*?)-" + extension);
  const resolutionRegex = new RegExp("-(\\d+x\\d+)-");

  const fileName = url.match(fileNameRegex);

  const imgUrl =
    `https://cdn.sanity.io/images/kscrzjdc/production/` +
    fileName[1] +
    "." +
    extension;

  const resolution = url.match(resolutionRegex);

  const ratio =
    parseInt(resolution[1].split("x")[0]) /
    parseInt(resolution[1].split("x")[1]);

  return { imgUrl, ratio };
}

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};
