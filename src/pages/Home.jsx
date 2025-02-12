import "./Home.css";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  // const [serachResult, setSearchResult] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchResults = [
    "한간 불멍 스팟",
    "여의도 한강공원 불멍",
    "반포 한강공원 불멍",
    "뚝섬 한강공원 불멍",
  ].filter((item) =>
    item.toLowerCase().trim().includes(searchText.toLowerCase().trim())
  );

  const nav = useNavigate();

  const handleSearhChange = (e) => {
    setSearchText(e.target.value);
    setIsDropdownVisible(e.target.value.length > 0);
  };
  return (
    <div className="Home">
      <h2>
        불멍의 온기를 느끼며 <br /> 소중한 순간의 시작, 불멍 스팟에서
      </h2>

      <div className="search_container">
        <div className="search_input_container">
          <Search className="search_icon" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={handleSearhChange}
          />
        </div>
      </div>

      <div className="dropdown">
        {searchResults.length > 0 ? (
          searchResults.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                nav(`/search/${item}`);
                setIsDropdownVisible(false);
              }}
            >
              {item}
            </div>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Home;
