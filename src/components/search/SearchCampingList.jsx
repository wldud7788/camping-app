import PropTypes from "prop-types";
import { SearchCampingCard } from "./SearchCampingCard";

export const SearchCampingList = ({
  isLoading,
  displayData,
  setSelectedCamping,
  lastCampingElementRef, // 무한 스크롤을 위한 ref
  hasMore // 더 불러올 데이터가 있는지 여부
}) => {
  
  return (
    <>
      {displayData?.length > 0 ? (
        displayData.map((campingData, index) => {
          // 마지막 요소에 ref 연결
          if (displayData.length === index + 1) {
            return (
              <div ref={lastCampingElementRef} key={campingData.contentId}>
                <SearchCampingCard
                  campingData={campingData}
                  onClick={() => setSelectedCamping(campingData)}
                />
              </div>
            );
          } else {
            return (
              <SearchCampingCard
                key={campingData.contentId}
                campingData={campingData}
                onClick={() => setSelectedCamping(campingData)}
              />
            );
          }
        })
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
      
      {isLoading && displayData?.length > 0 && (
        <div>추가 데이터 로딩 중...</div>
      )}
      
      {!hasMore && displayData?.length > 0 && (
        <div>더 이상 데이터가 없습니다.</div>
      )}
    </>
  );
};

SearchCampingList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  displayData: PropTypes.array,
  setSelectedCamping: PropTypes.func.isRequired,
  lastCampingElementRef: PropTypes.func,
  hasMore: PropTypes.bool
};
