import "./Home.css";
import { SubNav } from "../components/home/SubNav";
import { CampRecommend } from "../components/home/CampRecommend";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { CampListSkeleton } from "../components/skeleton/CampListSkeleton";
const ErrorFallback = ({ error }) => {
  return (
    <div className="">
      <h2>에러발생</h2>
      <p>{error.message}</p>
    </div>
  );
};
export const Home = () => {
  return (
    <div className="Home">
      <SubNav />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<CampListSkeleton title="추천" />}>
          <CampRecommend />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
