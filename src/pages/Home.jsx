import "./Home.css";
import { SubNav } from "../components/home/SubNav";
import { CampRecommend } from "../components/home/CampRecommend";
export const Home = () => {
  return (
    <div className="Home">
      <SubNav />
      <CampRecommend />
    </div>
  );
};
