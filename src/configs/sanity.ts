import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID as string,
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN as string,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
