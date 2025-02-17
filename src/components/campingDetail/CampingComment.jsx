import PropTypes from "prop-types";

export const CampingComment = ({ campingData }) => {
  console.log(campingData);
  return <div>안녕</div>;
};

CampingComment.propTypes = {
  campingData: PropTypes.shape({
    contentId: PropTypes.string,
  }),
};
