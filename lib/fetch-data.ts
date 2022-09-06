import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
const formatData = (data: any) => {
  return {
    ...data,
    time: dayjs.unix(data.type ? data.time : data.created).fromNow(),
  };
};

export const fetchData = async (id: number | string) => {
  const endpoint = typeof id === "number" ? `item/${id}` : `user/${id}`;
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`);
  const item = await res.json();
  return formatData(item);
};
