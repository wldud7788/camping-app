import PropTypes from "prop-types";

export const CampingInfoDetail = ({ campingData }) => {
  const { animalCmgCl, intro, featureNm, sbrsCl, posblFcltyCl } =
    campingData || {};

  const sbrsClArray = sbrsCl?.split(",") || [];
  const posblFcltyClArray =
    posblFcltyCl?.split(" ").flatMap((item) => item.split(",")) || [];
  console.log(campingData);
  return (
    <>
      <div className="camping_info_detail">
        {sbrsClArray.length > 0 && (
          <dl>
            <dt>부대시설</dt>
            <dd className="tag_container">
              {sbrsClArray.map((sbrsCl, idx) => {
                return (
                  <span className="tag" key={`${sbrsCl}-${idx}`}>
                    {sbrsCl.trim()}
                  </span>
                );
              })}
            </dd>
          </dl>
        )}
        {posblFcltyCl.length > 0 && (
          <dl>
            <dt className="fclty icon_bg">주변 이용 가능 시설</dt>
            <dd className="tag_conatiner">
              {posblFcltyClArray.map((posblFclty, idx) => {
                return (
                  <span className="tag" key={`${posblFclty}-${idx}`}>
                    {posblFclty.trim()}
                  </span>
                );
              })}
            </dd>
          </dl>
        )}

        <dl>
          <dt>애완견 가능여부</dt>
          <dd className="tag_container">
            <span className="tag">{animalCmgCl}</span>
          </dd>
        </dl>
        {intro && (
          <dl>
            <dt className="bulb icon_bg">캠핑장 소개</dt>
            <dd>
              <p className="intro"> {intro}</p>
            </dd>
          </dl>
        )}
        {featureNm && (
          <dl>
            <dt>특징</dt>
            <dd>
              <p>{featureNm}</p>
            </dd>
          </dl>
        )}
      </div>
    </>
  );
};

CampingInfoDetail.propTypes = {
  campingData: PropTypes.shape({
    animalCmgCl: PropTypes.string,
    intro: PropTypes.string,
    featureNm: PropTypes.string,
    sbrsCl: PropTypes.string,
    posblFcltyCl: PropTypes.string,
  }),
};
