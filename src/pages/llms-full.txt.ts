import { description, generateFileContent, getAllFiles, title, } from '@/data/llms';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const files = await getAllFiles();
  const contents = await Promise.all(files.map((file) => generateFileContent(file)));
  return new Response(`# ${title}\n\n${description}${contents.join('')}`);
}