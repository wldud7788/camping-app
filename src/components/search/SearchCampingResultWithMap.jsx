import { useCallback, useEffect, useRef, useState } from "react";
import { useCampingSearch } from "../../shared/hooks/search/useCampingSearch";
import { useDebounce } from "../../shared/hooks/search/useDebounce";
import { KakaoMap } from "../map/KakaoMap";
import { useCampings } from "../../shared/hooks/useCampings";
import PropTypes from "prop-types";
import { SearchCampingList } from "./SearchCampingList";

export const SearchCampingResultWithMap = ({ setSearchParams, searchText }) => {
  // 검색어를 디바운싱해서 저장
  const debouncedSearchText = useDebounce(searchText, 500);
  
  // 무한 스크롤을 위한 상태 관리
  const [page, setPage] = useState(1);
  const [allCampingData, setAllCampingData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  
  // 검색 결과를 위한 쿼리 (페이지 정보 포함)
  const { data: searchResults, isLoading: isSearchLoading } =
    useCampingSearch(debouncedSearchText, page);

  // 기본 캠핑장 목록을 위한 쿼리 (페이지 정보 포함)
  const { data: defaultCamping, isLoading: isDefaultLoading } = useCampings(6, page);

  // 현재 표시할 데이터와 로딩 상태 결정
  const displayData = allCampingData;
  const isLoading = debouncedSearchText ? isSearchLoading : isDefaultLoading;

  // 선택된 캠핑장의 초기값에 초기 위도 경도 설정
  const [selectedCamping, setSelectedCamping] = useState(null);

  // 새 검색어 입력 시 상태 초기화
  useEffect(() => {
    setAllCampingData([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearchText]);

  // 데이터가 로드되면 리스트에 추가
  useEffect(() => {
    const currentData = debouncedSearchText ? searchResults : defaultCamping;
    
    // 새 데이터가 있을 경우 처리
    if (currentData && Array.isArray(currentData) && currentData.length > 0) {
      // searchResults가 배열인 경우 (직접 항목 배열을 반환하는 경우)
      setAllCampingData(prev => {
        const newItems = currentData.filter(
          newItem => !prev.some(existingItem => existingItem.contentId === newItem.contentId)
        );
        return [...prev, ...newItems];
      });
      
      setHasMore(currentData.length === 6);
    } else if (currentData && currentData.items && currentData.items.item) {
      // defaultCamping이 객체 구조인 경우
      const items = Array.isArray(currentData.items.item) 
        ? currentData.items.item 
        : [currentData.items.item];
      
      setAllCampingData(prev => {
        const newItems = items.filter(
          newItem => !prev.some(existingItem => existingItem.contentId === newItem.contentId)
        );
        return [...prev, ...newItems];
      });
      
      setHasMore(items.length === 6);
    } else if (currentData && (!currentData.length || (currentData.items && !currentData.items.item))) {
      // 데이터가 없는 경우
      setHasMore(false);
    }
  }, [searchResults, defaultCamping, debouncedSearchText]);

  // URL 파라미터 업데이트
  useEffect(() => {
    if (debouncedSearchText) {
      setSearchParams({ keyword: debouncedSearchText });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchText, setSearchParams]);

  // 무한 스크롤을 위한 인터섹션 옵저버 설정
  const lastCampingElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  return (
    <div className="search_result">
      <div className="search_result_left">
        <SearchCampingList
          isLoading={isLoading}
          displayData={displayData}
          setSelectedCamping={setSelectedCamping}
          lastCampingElementRef={lastCampingElementRef}
          hasMore={hasMore}
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
