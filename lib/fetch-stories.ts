import { Story } from "../interfaces/story";
import { fetchData } from "./fetch-data";

const validStories = new Map([
  ["news", "top"],
  ["newest", "new"],
  ["ask", "ask"],
  ["show", "show"],
  ["jobs", "job"],
]);

export const fetchStories = async (
  stories: string,
  page: string
): Promise<{ items: Story[]; start: number }> => {
  const start = (+page - 1) * 30;
  const end = start + 30;

  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/${validStories.get(stories)}stories.json`
  );
  const ids = await res.json();

  const items = await Promise.all(
    ids.slice(start, end).map((id: number) => fetchData(`item/${id}`))
  );
  return { items, start };
};
