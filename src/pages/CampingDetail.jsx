import { useCampings } from "@/shared/hooks/useCampings";
import "./CampingDetail.css";
import { useParams } from "react-router-dom";
import { CAMPING_API } from "@/shared/api/campingApi";
import { CampingOverview } from "@/components/campingDetail/CampingOverview";
import { CampingInfoDetail } from "@/components/campingDetail/CampingInfoDetail";

export const CampingDetail = () => {
  const params = useParams();
  const { data, error } = useCampings(CAMPING_API.TOTAL_COUNT);

  const campingData = data?.find((item) => item.contentId === params.id);

  if (!campingData) return <div>...로딩중</div>;
  if (error) return <div>에러발생: {error.message}</div>;

  return (
    <div className="camping_detail">
      <CampingOverview campingData={campingData} />
      <CampingInfoDetail campingData={campingData} />
    </div>
  );
};
