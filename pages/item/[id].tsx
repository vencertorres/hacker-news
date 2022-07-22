import { formatDistanceToNowStrict, fromUnixTime } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { parse } from "tldts";
import Comment from "../../components/comment";
import { getItem } from "../../lib/items";
import Error500 from "../500";
import styles from "./item.module.css";

const Story = () => {
  const { query, isReady } = useRouter();
  const { data: story, error } = useSWR(isReady ? query.id : null, getItem);

  if (error) return <Error500 />;

  if (!story) return null;

  return (
    <div className={styles.item}>
      <Head>
        <title>{story.title} | Hacker News</title>
      </Head>

      <article>
        <h1>
          {story.url ? (
            <a href={story.url}>{story.title}</a>
          ) : (
            <Link href="/item/[id]" as={`/item/${story.id}`}>
              {story.title}
            </Link>
          )}{" "}
          {story.url && <small>({parse(story.url).domain})</small>}
        </h1>

        <small>
          {story.score} points by{" "}
          <Link href="/user/[username]" as={`/user/${story.by}`}>
            <a>{story.by}</a>
          </Link>{" "}
          {formatDistanceToNowStrict(fromUnixTime(story.time))} ago
        </small>

        {story.text && <p dangerouslySetInnerHTML={{ __html: story.text }} />}

        <section>
          {story.kids?.map((id: any) => (
            <Comment key={id} id={id} />
          ))}
        </section>
      </article>
    </div>
  );
};

export default Story;
