// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const latestReleasesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  "latest-releases": latestReleasesCollection,
};
