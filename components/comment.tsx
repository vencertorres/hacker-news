import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import useSWR from "swr";
import { getItem } from "../lib/items";
import styles from "./comment.module.css";

const Comment = ({ id }: { id: number }) => {
  const { data: comment, error } = useSWR(() => id, getItem);

  if (!comment) return <p>Loading...</p>;

  return (
    <article className={styles.comment}>
      <h2>
        {comment.by} {formatDistanceToNowStrict(fromUnixTime(comment.time))}
      </h2>

      <p dangerouslySetInnerHTML={{ __html: comment.text }} />

      {comment.kids && (
        <ul>
          {comment.kids.map((id: number) => (
            <li key={id}>
              <Comment id={id} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default Comment;
