import "./CampingDetail.css";
import { useParams } from "react-router-dom";
import { useAllCampings } from "../shared/hooks/useAllCampings";

export const CampingDetail = () => {
  const params = useParams();
  const { data } = useAllCampings();

  const campingData = data?.find((item) => item.contentId === params.id);
  if (!campingData) return <div>...로딩중</div>;

  const indutyArray = campingData.induty.split(",");
  console.log(campingData);
  return (
    <div className="camping_detail">
      <div className="camping_overview_section">
        <div className="camping_imgbox">
          <img
            src={campingData.firstImageUrl}
            alt={`${campingData.facltNm} 이미지`}
          />
        </div>
        <div className="camping_info">
          <h1 className="name">{campingData.facltNm}</h1>
          <p className="addr">{campingData.addr1}</p>
          <span>평점: 4.33점</span>
          <span>리뷰 3개</span>

          <div className="induty_container">
            {indutyArray.map((item) => {
              return (
                <span className="induty" key={item}>
                  {item}
                </span>
              );
            })}
          </div>
          <dl>
            <dt>한줄소개</dt>
            <dd>{campingData.lineIntro}</dd>
          </dl>

          <dl>
            <dt>사이트 종류</dt>
            <dd>
              <span className="site_bottm">
                {Number(campingData.siteBottomCl1) > 0 && "잔디"}
                {Number(campingData.siteBottomCl2) > 0 && "파쇄석"}
                {Number(campingData.siteBottomCl3) > 0 && "테크"}
                {Number(campingData.siteBottomCl4) > 0 && "자갈"}
                {Number(campingData.siteBottomCl5) > 0 && "맨흙"}
              </span>
            </dd>
          </dl>
          {/* 캠핑장 평점 및 리뷰 */}
          {campingData.tel && (
            <dl>
              <dt>전화번호</dt>
              <dd>{campingData.tel}</dd>
            </dl>
          )}
        </div>
      </div>

      <div>
        <dl>
          <dt>부대시설</dt>
          <dd>
            {/* 여러개일 수 있음 */}
            {/* <span>{campingData.sbrsCl}</span>  */}
            <span>부대1</span>
            <span>부대2</span>
          </dd>
        </dl>
        <dl>
          <dt>주변 이용 가능 시설</dt>
          <dd>
            {/* <span>{campingData.posblFcltyCl}</span>  */}
            <span>수영장</span>
            <span>수영장</span>
          </dd>
        </dl>
        <dl>
          <dt>애완견 가능여부</dt>
          <dd>{campingData.animalCmgCl}</dd>
        </dl>
        {/* 캠핑장 소개 */}
        <p className="intro">
          캠핑장 설명: {campingData.intro || "캠핑장 설명 준비중.."}
        </p>
        <p>특징: {campingData.featureNm}</p>
        {/* 캠핑장 제공? */}

        {/* 주변 정보 */}
        {/* 캠핑장 종류 */}
        <span className="induty">캠핑장 종류: {campingData.induty}</span>
      </div>
    </div>
  );
};
