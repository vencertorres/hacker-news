import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import ListItem from "../../components/listitem";
import { getItems } from "../../lib/items";
import Error500 from "../500";

const Stories = () => {
  const { query, isReady } = useRouter();
  const { data, error } = useSWR(isReady ? [query.stories, query.page] : null, getItems);

  if (error) {
    return <Error500 />;
  }

  if (!data) return null;

  return (
    <>
      <Head>
        <title>Hacker News</title>
      </Head>

      <section>
        {data.items.map((story: any, index: number) => (
          <ListItem key={story.id} rank={data.start + index + 1} {...story} />
        ))}
        <Link href="/[stories]/[page]" as={`/${query.stories}/${+query.page! + 1}`}>
          <a>More</a>
        </Link>
      </section>
    </>
  );
};

export default Stories;
