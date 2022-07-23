import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { getItem } from "../lib/items";
import styles from "./comment.module.css";

const Comment = ({ id }: { id: number }) => {
  const { data: comment } = useSWR(() => id, getItem);
  const [isCollapsed, setCollapsed] = useState(false);

  if (!comment) return <p>Loading...</p>;

  if (comment.deleted || comment.dead) return null;

  return (
    <article className={styles.comment}>
      <h2>
        <Link href="/user/[username]" as={`/user/${comment.by}`}>
          <a>{comment.by}</a>
        </Link>{" "}
        {formatDistanceToNowStrict(fromUnixTime(comment.time))}{" "}
        <button onClick={() => setCollapsed(!isCollapsed)}>{isCollapsed ? "[+]" : "[–]"}</button>
      </h2>

      {!isCollapsed && <p dangerouslySetInnerHTML={{ __html: comment.text }} />}

      {!isCollapsed && (
        <ul>
          {comment.kids?.map((id: number) => (
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
