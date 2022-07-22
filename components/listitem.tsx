import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import Link from "next/link";
import { parse } from "tldts";
import styles from "./listitem.module.css";

type Props = {
  rank: number;
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

const ListItem = ({ ...story }: Props) => (
  <article className={styles.listitem}>
    <div className={styles.rank}>{story.rank}</div>

    <div>
      <h2>
        {story.url ? (
          <a href={story.url}>{story.title}</a>
        ) : (
          <Link href="/item/[id]" as={`/item/${story.id}`}>
            {story.title}
          </Link>
        )}{" "}
        {story.url && <small>({parse(story.url).domain})</small>}
      </h2>

      <small>
        {story.type === "job" ? (
          <>{formatDistanceToNowStrict(fromUnixTime(story.time))}</>
        ) : (
          <>
            {story.score} points by{" "}
            <Link href="/user/[username]" as={`/user/${story.by}`}>
              <a>{story.by}</a>
            </Link>{" "}
            {formatDistanceToNowStrict(fromUnixTime(story.time))} ago |{" "}
            <Link href="/item/[id]" as={`/item/${story.id}`}>
              <a>
                {story.descendants}
                {story.descendants === 1 ? " comment" : " comments"}
              </a>
            </Link>
          </>
        )}
      </small>
    </div>
  </article>
);

export default ListItem;
