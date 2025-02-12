import { Link } from "react-router-dom";
import { MENU_ITEMS } from "../shared/constants/menuItems";
import "./Home.css";
import { useCampings } from "../shared/hooks/useCampings";
import { CampingCard } from "../components/CampingCard";
export const Home = () => {
  const { data, error } = useCampings();
  if (!data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  console.log(data);
  return (
    <div className="Home">
      <div className="sub_nav">
        <ul>
          {MENU_ITEMS.map((item) => {
            return (
              <li key={item.id}>
                <Link to={item.link}>
                  <img src={item.img} alt={item.alt} />
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="recommend">
        <div className="camping_list_wrapper">
          <h1>캠핑장 추천</h1>
          <div className="camping_list">
            {data?.map((campingData) => {
              return (
                <CampingCard
                  key={campingData.contentId}
                  campingData={campingData}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
