import PropTypes from "prop-types";
import { SearchCampingCard } from "./SearchCampingCard";

export const SearchCampingList = ({
  isLoading,
  displayData,
  setSelectedCamping,
}) => {
  return (
    <>
      {isLoading ? (
        <div>로딩중...</div>
      ) : displayData?.length > 0 ? (
        displayData.map((campingData) => (
          <SearchCampingCard
            key={campingData.contentId}
            campingData={campingData}
            onClick={() => setSelectedCamping(campingData)}
          />
        ))
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </>
  );
};

SearchCampingList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  displayData: PropTypes.array,
  setSelectedCamping: PropTypes.func.isRequired,
};
