import "./Search.css";
import { SearchCampingCard } from "../components/search/SearchCampingCard";
import { useCampingSearch } from "../shared/hooks/comment/useCampingSearch";
import { useEffect, useState } from "react";
import { useDebounce } from "../shared/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useCampings } from "../shared/hooks/useCampings";
import { KakaoMap } from "../components/search/KakaoMap";

export const Search = () => {
  // 서치 파람스
  const [searchParams, setSearchParams] = useSearchParams();

  //입력받은 검색어
  const [searchText, setSearchText] = useState(
    searchParams.get("keyword") || ""
  );
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
    <div className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button>검색</button>
      </form>
      <div className="search_result">
        <div className="search_result_left">
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
        </div>
        <div className="search_result_right">
          <KakaoMap
            displayData={displayData}
            isLoading={isLoading}
            selectedCamping={selectedCamping}
          />
        </div>
      </div>
    </div>
  );
};
