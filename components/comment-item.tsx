import Link from "next/link";
import { useState } from "react";
import { Comment } from "../interfaces/comment";

const CommentItem = (props: Comment) => {
  const [expanded, setExpanded] = useState(true);
  const { by, comments, time, text, dead, deleted } = props;

  if (dead || deleted) return null;

  return (
    <li>
      <div className="meta">
        <Link href={`/user/${by}`}>
          <a className="user">{by}</a>
        </Link>{" "}
        {time} <button onClick={() => setExpanded(!expanded)}>[–]</button>
      </div>

      {expanded && (
        <>
          <p dangerouslySetInnerHTML={{ __html: text }} />

          <ul>
            {(comments || []).map((comment: any) => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </ul>
        </>
      )}

      <style jsx global>{`
        .meta {
          color: var(--fg-light);
          font-size: 0.9em;
          font-weight: 400;
        }

        .user:link {
          color: var(--fg-light);
          text-decoration: none;
        }

        p {
          margin: 0.5em 0;
        }

        p a:link {
          text-decoration: underline;
        }

        p pre {
          overflow-x: auto;
        }

        ul {
          list-style: none;
        }

        button {
          padding: 0;
          border: none;
          color: inherit;
          background: none;
          cursor: pointer;
        }

        @media only screen and (min-width: 300px) and (max-width: 750px) {
          ul {
            padding-left: 1rem;
          }
        }
      `}</style>
    </li>
  );
};

export default CommentItem;
