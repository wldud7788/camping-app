import "./CampingList.css";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSuspenseInfiniteCampings } from "../../shared/hooks/useSuspenseInfiniteCampings";
import { CampingCard } from "./CampingCard";

export const CampingList = () => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteCampings();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="camping_list_wrapper">
      <h1>캠핑장 리스트</h1>
      <div className="camping_list">
        {data?.pages.map((page) =>
          page.map((campingData) => (
            <CampingCard
              key={campingData.contentId}
              campingData={campingData}
            />
          ))
        )}
      </div>

      <div ref={ref}>
        {isFetchingNextPage ? (
          <div>더 불러오는 중...</div>
        ) : hasNextPage ? (
          <div>스크롤하여 더 보기</div>
        ) : (
          <div>모든 캠핑장을 불러왔습니다.</div>
        )}
      </div>
    </div>
  );
};
