import { useCampings } from "@/shared/hooks/useCampings";
import "./Search.css";
import { SearchCampingCard } from "@/components/search/SearchCampingCard";
// import { useParams } from "react-router-dom";

export const Search = () => {
  const { data, error } = useCampings();
  // const params = useParams();
  if (!data) return <div>...로딩중</div>;
  if (error) return <div>에러발생: {error.message}</div>;
  console.log("glgl", data);
  return (
    <div className="search">
      <input type="text" placeholder="검색어를 입력해주세요" />
      <div className="search_result">
        <div className="search_result_left">
          {data &&
            data.map((campingData) => {
              return (
                <SearchCampingCard
                  key={campingData.contentId}
                  campingData={campingData}
                />
              );
            })}
        </div>
        <div className="search_result_right">지도영역</div>
      </div>
    </div>
  );
};
