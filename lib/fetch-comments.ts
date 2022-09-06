import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { fetchData } from "./fetch-data";

dayjs.extend(relativeTime);
export const fetchComments = async (ids: number[]): Promise<any[]> => {
  return Promise.all(
    ids.map(async (id) => {
      const comment = await fetchData(id);
      return {
        ...comment,
        comments: await fetchComments(comment.kids || []),
      };
    })
  );
};
