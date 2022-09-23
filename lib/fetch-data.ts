import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(LocalizedFormat);
const formatData = (data: any) => {
  if (data.type) {
    return {
      ...data,
      time: dayjs.unix(data.time).fromNow(),
    };
  }
  return {
    ...data,
    created: dayjs.unix(data.created).format("LL"),
  };
};

export const fetchData = async (endpoint: string) => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/${endpoint}.json`);
  const item = await res.json();
  return formatData(item);
};
