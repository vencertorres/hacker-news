import { fetchData } from "./fetch-data";

const validStories = new Map([
  ["news", "top"],
  ["newest", "new"],
  ["ask", "ask"],
  ["show", "show"],
  ["jobs", "job"],
]);

export const fetchStories = async (stories: string, page: string) => {
  const start = (+page - 1) * 30;
  const end = start + 30;

  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/${validStories.get(stories)}stories.json`
  );
  const ids = await res.json();

  const items = await Promise.all(ids.slice(start, end).map(fetchData));
  return { items, start };
};
