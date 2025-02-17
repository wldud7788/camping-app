import { SubNav } from "@/components/home/SubNav";
import "./Home.css";
import { CampRecommend } from "@/components/home/CampRecommend";
export const Home = () => {
  return (
    <div className="Home">
      <SubNav />
      <CampRecommend />
    </div>
  );
};
