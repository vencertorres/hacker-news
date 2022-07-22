const BASE_URL = "https://hacker-news.firebaseio.com/v0";
const PAGE_SIZE = 30;

const getIds = async (type: string) => {
  const list = type === "jobs" ? "job" : type;
  const res = await fetch(`${BASE_URL}/${list}stories.json`);
  const ids = await res.json();
  return ids;
};

export const getItem = async (id: number) => {
  const res = await fetch(`${BASE_URL}/item/${id}.json`);
  const story = await res.json();
  return story;
};

const getPage = (page: string) => {
  if (+page <= 0) {
    throw new Error("Page number must be 1 or greater");
  }

  const start = (+page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return { start, end };
};

export const getItems = async (stories: string, page: string) => {
  const { start, end } = getPage(page);
  const ids = await getIds(stories);
  const items = await Promise.all(ids.slice(start, end).map(getItem));
  return { items, start };
};
