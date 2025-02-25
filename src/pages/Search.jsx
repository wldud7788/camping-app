import "./Search.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchCampingForm } from "../components/search/SearchCampingForm";
import { SearchCampingResultWithMap } from "../components/search/SearchCampingResultWithMap";

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
      <SearchCampingResultWithMap
        setSearchParams={setSearchParams}
        searchText={searchText}
      />
    </div>
  );
};
