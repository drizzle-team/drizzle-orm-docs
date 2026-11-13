import type { APIRoute, GetStaticPaths, InferGetStaticPropsType } from "astro";

import { getReleasePosts, getReleasePath, toReleaseMarkdown } from "@/releases/posts";

export const getStaticPaths = (async () => {
  const posts = await getReleasePosts();

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}) satisfies GetStaticPaths;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props, site }) => {
  const canonicalUrl = new URL(getReleasePath(props.post.slug), site).toString();

  return new Response(toReleaseMarkdown(props.post, canonicalUrl), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
