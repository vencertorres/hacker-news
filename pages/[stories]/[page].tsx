import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import StoryItem from "../../components/story-item";
import { fetchStories } from "../../lib/fetch-stories";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { stories: "news", page: "1" } }],
    fallback: "blocking",
  };
};

interface Params extends ParsedUrlQuery {
  stories: string;
  page: string;
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { stories, page } = context.params as Params;
  const { items, start } = await fetchStories(stories, page);
  return {
    props: {
      items,
      start,
      stories,
      page,
    },
    revalidate: 60,
  };
};

const Stories = ({
  items,
  start,
  stories,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Hacker News</title>
      </Head>

      <ol start={start + 1}>
        {items.map((story: any) => (
          <li key={story.id}>
            <StoryItem {...story} />
          </li>
        ))}
        <li>
          <Link href={`/${stories}/${+page + 1}`}>
            <a>More</a>
          </Link>
        </li>
      </ol>

      <style jsx>{`
        ol {
          padding: 0 0 0 2rem;
          margin: 0;
        }

        li {
          color: var(--fg-light);
        }

        li:last-child {
          padding: 1rem 0;
          list-style: none;
        }
      `}</style>
    </>
  );
};

export default Stories;
