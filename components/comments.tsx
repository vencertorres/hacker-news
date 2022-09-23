import { Comment } from "../interfaces/comment";
import CommentItem from "./comment-item";

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      <ul>
        {(comments || []).map((comment: any) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </ul>

      <style jsx>{`
        ul {
          padding: 0;
          list-style: none;
        }
      `}</style>
    </div>
  );
};

export default Comments;
