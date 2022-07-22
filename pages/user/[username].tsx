import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error500 from "../500";

export const getUser = async (username: string) => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/user/${username}.json`);
  const user = await res.json();

  if (!user) {
    throw new Error("Item not found");
  }

  return user;
};

const User = () => {
  const { query, isReady } = useRouter();
  const { data: user, error } = useSWR(isReady ? query.username : null, getUser);

  if (error) return <Error500 />;

  if (!user) return null;

  return (
    <>
      <Head>
        <title>Profile: {user.id} | Hacker News</title>
      </Head>

      <h1>{user.id}</h1>
      <p>created: {user.created}</p>
      <p>karma: {user.karma}</p>

      <p dangerouslySetInnerHTML={{ __html: user.about }} />

      <p>
        <a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>submissions</a>
      </p>
      <p>
        <a href={`https://news.ycombinator.com/threads?id=${user.id}`}>comments</a>
      </p>
      <p>
        <a href={`https://news.ycombinator.com/favorites?id=${user.id}`}>favorites</a>
      </p>
    </>
  );
};

export default User;
