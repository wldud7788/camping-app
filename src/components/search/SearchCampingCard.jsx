import PropTypes from "prop-types";
import "./SearchCampingCard.css";
export const SearchCampingCard = ({ campingData, onClick }) => {
  return (
    <div className="search_camping_card" onClick={onClick}>
      <div className="search_img_box">
        <img
          src={campingData.firstImageUrl || "/img/camp_default.jpg"}
          alt="캠핑장 이미지"
        />
      </div>
      <div className="search_camping_card_info">
        <h2 className="name line-clamp-1">{campingData.facltNm}</h2>
        <p className="addr line-clamp-1">{campingData.addr1}</p>
        <div>
          <span className="induty">{campingData.induty}</span>
        </div>
      </div>
    </div>
  );
};

SearchCampingCard.propTypes = {
  campingData: PropTypes.shape({
    firstImageUrl: PropTypes.string,
    facltNm: PropTypes.string,
    addr1: PropTypes.string,
    induty: PropTypes.string,
  }),
};
