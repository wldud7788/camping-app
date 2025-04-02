import PropTypes from "prop-types";
import PaymentBtn from "./PaymentBtn";

export const CampingOverview = ({ campingData }) => {
  const {
    firstImageUrl,
    facltNm,
    addr1,
    lineIntro,
    siteBottomCl1,
    siteBottomCl2,
    siteBottomCl3,
    siteBottomCl4,
    siteBottomCl5,
    tel,
    induty,
  } = campingData || {};

  const indutyArray = induty?.split(",") || [];
  return (
    <>
      <div className="camping_overview_section">
        <div className="camping_imgbox">
          <img
            src={firstImageUrl || "/img/camp_default.jpg"}
            alt={`${facltNm} 이미지`}
          />
        </div>
        <div className="camping_info">
          <h1 className="name">{facltNm}</h1>
          <p className="addr">{addr1}</p>
          <div>
            <span className="star icon_bg">평점: 4.33점</span>
            <span>리뷰 3개</span>
          </div>
          {indutyArray.length > 0 && (
            <div className="induty_container">
              {indutyArray.map((induty, idx) => {
                return (
                  <span className="induty" key={`${induty}-${idx}`}>
                    {induty.trim()}
                  </span>
                );
              })}
            </div>
          )}
          {lineIntro && (
            <dl>
              <dt>한줄소개</dt>
              <dd>{lineIntro}</dd>
            </dl>
          )}

          {[
            siteBottomCl1,
            siteBottomCl2,
            siteBottomCl3,
            siteBottomCl4,
            siteBottomCl5,
          ].some((item) => Number(item) > 0) && (
            <dl>
              <dt>사이트 종류</dt>
              <dd className="tag_container">
                <span className="tag">
                  {Number(siteBottomCl1) > 0 && "잔디"}
                  {Number(siteBottomCl2) > 0 && "파쇄석"}
                  {Number(siteBottomCl3) > 0 && "테크"}
                  {Number(siteBottomCl4) > 0 && "자갈"}
                  {Number(siteBottomCl5) > 0 && "맨흙"}
                </span>
              </dd>
            </dl>
          )}
          {tel && (
            <dl>
              <dt>전화번호</dt>
              <dd>{tel}</dd>
            </dl>
          )}
          <PaymentBtn productName={facltNm} amount={500} />
        </div>
      </div>
    </>
  );
};

CampingOverview.propTypes = {
  campingData: PropTypes.shape({
    firstImageUrl: PropTypes.string,
    facltNm: PropTypes.string,
    addr1: PropTypes.string,
    lineIntro: PropTypes.string,
    siteBottomCl1: PropTypes.string,
    siteBottomCl2: PropTypes.string,
    siteBottomCl3: PropTypes.string,
    siteBottomCl4: PropTypes.string,
    siteBottomCl5: PropTypes.string,
    tel: PropTypes.string,
    induty: PropTypes.string,
  }),
};
