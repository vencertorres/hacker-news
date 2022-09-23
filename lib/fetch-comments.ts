import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Comment } from "../interfaces/comment";
import { fetchData } from "./fetch-data";

dayjs.extend(relativeTime);
export const fetchComments = async (ids: number[]): Promise<Comment[]> => {
  return Promise.all(
    ids.map(async (id) => {
      const comment = await fetchData(`item/${id}`);
      return {
        ...comment,
        comments: await fetchComments(comment.kids || []),
      };
    })
  );
};
