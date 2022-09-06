import Comment from "./comment";

const Comments = ({ comments }: { comments: any[] }) => {
  return (
    <div>
      <ul>
        {(comments || []).map((comment: any) => (
          <Comment key={comment.id} {...comment} />
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
