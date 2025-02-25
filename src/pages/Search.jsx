import "./Search.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchCampingListWithMap } from "../components/search/SearchCampingListWithMap";
import { SearchCampingForm } from "../components/search/SearchCampingForm";

export const Search = () => {
  // 서치 파람스
  const [searchParams, setSearchParams] = useSearchParams();

  //입력받은 검색어
  const [searchText, setSearchText] = useState(
    searchParams.get("keyword") || ""
  );

  return (
    <div className="search">
      <SearchCampingForm
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <SearchCampingListWithMap
        setSearchParams={setSearchParams}
        searchText={searchText}
      />
    </div>
  );
};
