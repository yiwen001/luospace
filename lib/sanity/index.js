import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "kscrzjdc",
  dataset: "production",
  apiVersion: "2024-12-01",
  useCdn: true,
});
