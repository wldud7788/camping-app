import "./CampingCommentCard.css";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { useDeleteComment } from "../../../shared/hooks/comment/useDeleteComment";
import { useUpdateComment } from "../../../shared/hooks/comment/useUpdateComment";
import { AuthContext } from "../../../shared/contexts/AuthContext";

export const CampingCommentCard = ({ commentData }) => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");
  console.log("commentData", commentData);

  const { id, users, content } = commentData;
  console.log("user", user);
  console.log("user", users);
  const deleteComment = useDeleteComment(commentData.content_id);
  const updateComment = useUpdateComment(commentData.content_id);

  const onUpdateHandler = () => {
    const confrimUpdate = confirm("댓글을 수정하시겟습니까?");
    if (confrimUpdate) {
      updateComment.mutate({ updateId: commentData.id, content: newComment });
    }
    setIsEditing(false);
  };
  const onDeleteHandler = async (deleteId) => {
    const confrimDelete = confirm("댓글을 삭제하시겠습니까?");
    if (confrimDelete) {
      deleteComment.mutate(deleteId);
    }
  };
  return (
    <>
      <div className="comment_card">
        <div className="user_info">
          <img
            src={users.avatar_url || "/icon/ico_default_profile.png"}
            alt="프로필 이미지"
          />
          <div>
            <p className="nick">{users.name}</p>
            <p className="date">
              {commentData?.created_at &&
                format(new Date(commentData.created_at), "yy.MM.dd HH:mm")}
            </p>
          </div>
        </div>
        {!isEditing ? (
          <>
            <p className="comment">{content}</p>
            <div className="button_wrapper">
              {commentData?.user_id === user?.id && (
                <>
                  <button onClick={() => setIsEditing(true)}>수정</button>
                  <button onClick={() => onDeleteHandler(id)}>삭제</button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <textarea
              placeholder="수정할 내용을 입력해주세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div className="button_wrapper">
              <button onClick={() => onUpdateHandler(id)}>수정</button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewComment("");
                }}
              >
                취소
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
CampingCommentCard.propTypes = {
  commentData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content_id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    user_id: PropTypes.string,
    users: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar_url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
