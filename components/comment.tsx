import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import useSWR from "swr";
import { getItem } from "../lib/items";
import Error500 from "../pages/500";
import styles from "./comment.module.css";

const Comment = ({ id }: { id: number }) => {
  const { data: comment, error } = useSWR(() => id, getItem);

  if (error) return <Error500 />;

  if (!comment) return <p>Loading...</p>;

  if (comment.deleted || comment.dead) return null;

  return (
    <article className={styles.comment}>
      <h2>
        {comment.by} {formatDistanceToNowStrict(fromUnixTime(comment.time))}
      </h2>

      <p dangerouslySetInnerHTML={{ __html: comment.text }} />

      <ul>
        {comment.kids?.map((id: number) => (
          <li key={id}>
            <Comment id={id} />
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Comment;
