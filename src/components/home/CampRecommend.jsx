import { useCampings } from "@/shared/hooks/useCampings";
import { CampingCard } from "../campingAll/CampingCard";

export const CampRecommend = () => {
  const { data, error } = useCampings();
  if (!data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  return (
    <>
      <div className="recommend">
        <div className="camping_list_wrapper">
          <h1>캠핑장 추천</h1>
          <div className="camping_list">
            {data?.map((campingData) => {
              return (
                <CampingCard
                  key={campingData.contentId}
                  campingData={campingData}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
