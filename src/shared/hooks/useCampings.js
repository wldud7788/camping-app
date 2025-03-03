import { useQuery } from "@tanstack/react-query";
import { campingAPi } from "../api/campingApi";

export const useCampings = (limit = 6) => {
  return useQuery({
    queryKey: ["campings", "all"],
    queryFn: async () => {
      const data = await campingAPi.getBasedList(1, limit);
      return data.items.item;
    },
    staleTime: 1000 * 60 * 60 * 1,
    suspense: true,
  });
};
