import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import { parse } from "tldts";
import styles from "./listitem.module.css";

type Time = number;

type URL = string;

type Props = {
  rank: number;
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: Time;
  title: string;
  type: string;
  url: URL;
};

const Time = ({ time }: { time: Time }) => <>{formatDistanceToNowStrict(fromUnixTime(time))}</>;

const Domain = ({ url }: { url: URL }) => <small>({parse(url).domain})</small>;

const ListItem = ({ ...story }: Props) => (
  <article className={styles.item}>
    <div className={styles.rank}>{story.rank}</div>

    <div>
      <h2>
        <a href={story.url}>{story.title}</a> {story.url && <Domain url={story.url} />}
      </h2>

      <small>
        {story.type === "job" ? (
          <Time time={story.time} />
        ) : (
          <>
            {story.score} points by {story.by} <Time time={story.time} /> ago
            {story.descendants
              ? ` | ${story.descendants} comments`
              : story.descendants === 1
              ? ` | ${story.descendants} comment`
              : null}
          </>
        )}
      </small>
    </div>
  </article>
);

export default ListItem;
