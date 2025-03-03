import { CampingCardSkeleton } from "./CampingCardSkeleton";
import "./CampListSkeleton.css";
export const CampListSkeleton = ({ title }) => {
  const count = 6;
  return (
    <div className="recommend">
      <div className="camping_list_wrapper">
        <h1>캠핑장 {title}</h1>
        <div className="camping_list">
          {Array(count)
            .fill(0)
            .map((_, index) => (
              <CampingCardSkeleton key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};
