import { useCampings } from "../../shared/hooks/useCampings";
import { CampingCard } from "../campingAll/CampingCard";

export const CampRecommend = () => {
  const { data } = useCampings();
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
