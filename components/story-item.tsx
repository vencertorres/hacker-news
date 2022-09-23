import Link from "next/link";
import { parse } from "tldts";
import { Story } from "../interfaces/story";

const plural = (n: number, s: string) => {
  if (n === 1) {
    return `${n} ${s}`;
  } else if (n > 1) {
    return `${n} ${s}s`;
  } else {
    return "";
  }
};

const StoryItem = (props: Story) => {
  const { by, descendants, id, score, time, title, type, url } = props;

  return (
    <article>
      <h2>
        {url ? (
          <a href={url}>{title}</a>
        ) : (
          <Link href={`/item/${id}`}>
            <a>{title}</a>
          </Link>
        )}{" "}
        <span className="domain">{url && `(${parse(url).domain})`}</span>
      </h2>

      {type === "job" ? (
        <div className="meta">{time}</div>
      ) : (
        <div className="meta">
          {plural(score, "point")} by{" "}
          <Link href={`/user/${by}`}>
            <a>{by}</a>
          </Link>{" "}
          {time} |{" "}
          <Link href={`/item/${id}`}>
            <a>{plural(descendants, "comment")}</a>
          </Link>
        </div>
      )}

      <style jsx>{`
        article {
          padding: 0.3rem 0;
        }

        h2 {
          margin: 0 0 0.2rem 0;
          font-size: 1rem;
          font-weight: 400;
          color: var(--fg);
        }

        a:link {
          text-decoration: none;
        }

        .domain,
        .meta {
          color: var(--fg-light);
        }

        .domain {
          font-size: 0.9rem;
          color: var(--fg-light);
        }

        .meta {
          font-size: 0.8rem;
        }

        .meta a:link {
          color: var(--fg-light);
        }

        .meta a:hover,
        .meta a:focus {
          text-decoration: underline;
        }

        @media only screen and (min-width: 300px) and (max-width: 750px) {
          h2 {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </article>
  );
};

export default StoryItem;
