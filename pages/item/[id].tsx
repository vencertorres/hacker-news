import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import Comments from "../../components/comments";
import Story from "../../components/story";
import { fetchComments } from "../../lib/fetch-comments";
import { fetchData } from "../../lib/fetch-data";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: "blocking",
  };
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as Params;
  const story = await fetchData(+id);
  return {
    props: {
      story,
      comments: await fetchComments(story.kids || []),
    },
    revalidate: 60,
  };
};

const ItemPage = ({ story, comments }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `${story.title} | Hacker News`;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <Story {...story} />
      <p dangerouslySetInnerHTML={{ __html: story.text }} />

      <hr />

      <Comments comments={comments} />

      <style jsx>{`
        p {
          color: var(--fg-light);
        }

        hr {
          margin-top: 3rem;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default ItemPage;
