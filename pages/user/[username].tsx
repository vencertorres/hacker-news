import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { fetchData } from "../../lib/fetch-data";

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { username: "pg" } }],
    fallback: "blocking",
  };
};

interface Params extends ParsedUrlQuery {
  username: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { username } = context.params as Params;
  const user = await fetchData(username);
  return {
    props: {
      user,
    },
    revalidate: 60,
  };
};

const User = ({ user }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const title = `Profile: ${user.id} | Hacker News`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <p>user: {user.id}</p>
      <p>created: {user.time}</p>
      <p>karma: {user.karma}</p>

      <p>
        about: <span dangerouslySetInnerHTML={{ __html: user.about }} />
      </p>

      <p>
        <a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>submissions</a>
      </p>
      <p>
        <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>comments</a>
      </p>
      <p>
        <a href={`https://news.ycombinator.com/favorites?id=${user.id}`}>favorites</a>
      </p>

      <style jsx>{`
        h1 {
          font-size: 1rem;
          font-weight: 400;
        }
      `}</style>
    </>
  );
};

export default User;
