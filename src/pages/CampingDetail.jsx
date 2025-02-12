import "./CampingDetail.css";
import { useParams } from "react-router-dom";
import { CAMPING_API } from "../shared/api/campingApi";
import { useCampings } from "../shared/hooks/useCampings";

export const CampingDetail = () => {
  const params = useParams();
  const { data, error } = useCampings(CAMPING_API.TOTAL_COUNT);

  const campingData = data?.find((item) => item.contentId === params.id);
  const {
    firstImageUrl,
    facltNm,
    addr1,
    induty,
    lineIntro,
    siteBottomCl1,
    siteBottomCl2,
    siteBottomCl3,
    siteBottomCl4,
    siteBottomCl5,
    tel,
    animalCmgCl,
    intro,
    featureNm,
    sbrsCl,
    posblFcltyCl,
  } = campingData || {};

  if (!campingData) return <div>...로딩중</div>;
  if (error) return <div>에러발생: {error.message}</div>;
  const indutyArray = induty?.split(",") || [];
  const sbrsClArray = sbrsCl?.split(",") || [];
  const posblFcltyClArray =
    posblFcltyCl?.split(" ").flatMap((item) => item.split(",")) || [];
  console.log(campingData);
  return (
    <div className="camping_detail">
      <div className="camping_overview_section">
        <div className="camping_imgbox">
          <img src={firstImageUrl} alt={`${facltNm} 이미지`} />
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
        </div>
      </div>

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
    </div>
  );
};
