import { useInfiniteQuery } from "@tanstack/react-query";
import { CAMPING_API, campingAPi } from "../api/campingApi";

export const useInfiniteCampings = () => {
  return useInfiniteQuery({
    queryKey: ["campings", "infinite"],
    queryFn: async ({ pageParam }) => {
      const data = await campingAPi.getBasedList(pageParam);
      return data.items.item;
    },
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(
        CAMPING_API.TOTAL_COUNT / CAMPING_API.ROWS_PER_PAGE
      );
      const currentPage = pages.length;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
