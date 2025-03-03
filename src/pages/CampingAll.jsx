import { Suspense } from "react";
import { CampingList } from "../components/campingAll/CampingList";
import { ErrorBoundary } from "react-error-boundary";
import { CampListSkeleton } from "../components/skeleton/CampListSkeleton";
export const ErrorFallback = ({ error }) => {
  return (
    <div>
      <h2>에러발생</h2>
      <p>{error.message}</p>
    </div>
  );
};
export const CampingAll = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<CampListSkeleton title="리스트" />}>
        <CampingList />
      </Suspense>
    </ErrorBoundary>
  );
};
