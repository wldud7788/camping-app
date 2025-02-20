import "./CampingCommentList.css";
import PropTypes from "prop-types";
import { useReadComment } from "../../../shared/hooks/comment/useReadComments";
import { CampingCommentCard } from "./CampingCommentCard";

export const CampingCommentList = ({ contentId }) => {
  const { data: comments, isLoading, error } = useReadComment(contentId);

  if (isLoading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="comment_list">
      {comments?.map((commentData) => {
        return (
          <CampingCommentCard key={commentData.id} commentData={commentData} />
        );
      })}
    </div>
  );
};

CampingCommentList.propTypes = {
  contentId: PropTypes.string.isRequired,
};
