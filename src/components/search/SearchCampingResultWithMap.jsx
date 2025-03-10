import { useEffect, useState } from "react";
import { useCampingSearch } from "../../shared/hooks/search/useCampingSearch";
import { useDebounce } from "../../shared/hooks/search/useDebounce";
import { KakaoMap } from "../map/KakaoMap";
import { useCampings } from "../../shared/hooks/useCampings";
import PropTypes from "prop-types";
import { SearchCampingList } from "./SearchCampingList";

export const SearchCampingResultWithMap = ({ setSearchParams, searchText }) => {
  // 검색어를 디바운싱해서 저장
  const debouncedSearchText = useDebounce(searchText, 500);

  // 검색 결과를 위한 쿼리
  const { data: searchResults, isLoading: isSearchLoading } =
    useCampingSearch(debouncedSearchText);

  // 기본 캠핑장 목록을 위한 쿼리
  const { data: defaultCamping, isLoading: isDefaultLoading } = useCampings(6);

  // 현재 표시할 데이터와 로딩 상태 결정
  const displayData = debouncedSearchText ? searchResults : defaultCamping;
  const isLoading = debouncedSearchText ? isSearchLoading : isDefaultLoading;

  // 선택된 캠핑장의 초기값에 초기 위도 경도 설정
  const [selectedCamping, setSelectedCamping] = useState(null);

  useEffect(() => {
    // URL 파라미터 업데이트
    if (debouncedSearchText) {
      setSearchParams({ keyword: debouncedSearchText });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchText, setSearchParams]);

  return (
    <div className="search_result">
      <div className="search_result_left">
        <SearchCampingList
          isLoading={isLoading}
          displayData={displayData}
          setSelectedCamping={setSelectedCamping}
        />
      </div>
      <div className="search_result_right">
        <KakaoMap
          displayData={displayData}
          isLoading={isLoading}
          selectedCamping={selectedCamping}
        />
      </div>
    </div>
  );
};

SearchCampingResultWithMap.propTypes = {
  setSearchParams: PropTypes.func,
  searchText: PropTypes.string,
};
