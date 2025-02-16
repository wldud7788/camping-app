import { useQuery } from "@tanstack/react-query";
import { campingAPi } from "../api/campingApi";

export const useCampingSearch = (keyword, limit = 6) => {
  return useQuery({
    queryKey: ["campings", "search", keyword],
    queryFn: async () => {
      if (!keyword) return [];
      const data = await campingAPi.searchList(keyword, 1, limit);
      return data.items.item;
    },
    enabled: Boolean(keyword), // keyword가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 60 * 1, // 1시간
  });
};
