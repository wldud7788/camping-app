import "./CampingComment.css";
import PropTypes from "prop-types";
import { CampingCommentForm } from "./comment/CampingCommentForm";
import { CampingCommentList } from "./comment/CampingCommentList";

export const CampingComment = ({ contentId }) => {
  return (
    <div className="comment_form_wrapper">
      <h2>댓글</h2>
      <CampingCommentForm contentId={contentId} />
      <CampingCommentList contentId={contentId} />
    </div>
  );
};

CampingComment.propTypes = {
  contentId: PropTypes.string.isRequired,
};
