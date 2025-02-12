import "./CampingCard.css";
import PropTypes from "prop-types";
import { LikeButton } from "./common/LikeButton";
import { Link } from "react-router-dom";

export const CampingCard = ({ campingData }) => {
  return (
    <div className="camping_card">
      <Link to={`/camping/${campingData.contentId}`}>
        <img
          className="camping_imgbox"
          src={campingData.firstImageUrl || "/img/camp_default.jpg"}
        />
        <LikeButton />
        <div className="camping_info">
          <h2 className="name line-clamp-1">{campingData.facltNm}</h2>
          <p className="addr line-clamp-1">{campingData.addr1}</p>
          <p className="intro line-clamp-3">
            {campingData.intro || "캠핑장 설명 준비중.."}
          </p>
          <span className="induty">{campingData.induty}</span>
        </div>
      </Link>
    </div>
  );
};

CampingCard.propTypes = {
  campingData: PropTypes.shape({
    contentId: PropTypes.string.isRequired, // 아이디
    firstImageUrl: PropTypes.string, // 캠핑장 이미지
    facltNm: PropTypes.string.isRequired, // 캠핑장 이름
    addr1: PropTypes.string.isRequired, // 주소
    intro: PropTypes.string.isRequired, // 설명
    induty: PropTypes.string.isRequired, // 업종
  }).isRequired,
};
