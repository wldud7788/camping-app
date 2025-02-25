import { useQuery } from "@tanstack/react-query";
import { campingAPi } from "../../api/campingApi";

export const useCampingSearch = (keyword, limit = 500) => {
  return useQuery({
    queryKey: ["campings", "search", keyword],
    queryFn: async () => {
      try {
        if (!keyword.trim()) return [];
        const data = await campingAPi.searchList(keyword, 1, limit);

        if (!data?.items?.item) {
          return [];
        }
        return data.items.item;
      } catch (error) {
        console.error("camping search error", error);
        throw error;
      }
    },
    enabled: Boolean(keyword?.trim()), // keyword가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 60 * 1, // 1시간
  });
};
