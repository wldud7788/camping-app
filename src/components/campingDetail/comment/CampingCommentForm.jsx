import "./CampingCommentForm.css";
import { useState } from "react";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useCreateComment } from "../../../shared/hooks/comment/useCreateComment";
import PropTypes from "prop-types";

export const CampingCommentForm = ({ contentId }) => {
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const createComment = useCreateComment(contentId);
  const onCreateHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("로그인 후 댓글 입력 가능합니다.");
      return;
    }

    if (!comment.trim()) {
      alert("댓글을 입력해주세요");
      return;
    }

    const commentObj = {
      content: comment,
      content_id: contentId,
      user_id: user?.id,
    };

    createComment.mutate(commentObj);
    setComment("");
  };
  return (
    <form className="comment_form" onSubmit={onCreateHandler}>
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button>작성</button>
    </form>
  );
};

CampingCommentForm.propTypes = {
  contentId: PropTypes.string.isRequired,
};
