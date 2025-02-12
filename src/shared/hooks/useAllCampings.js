import { useQuery } from "@tanstack/react-query";
import { CAMPING_API, campingAPi } from "../api/campingApi";

export const useAllCampings = () => {
  return useQuery({
    queryKey: ["campings", "all"],
    queryFn: async () => {
      const data = await campingAPi.getBasedList(1, CAMPING_API.TOTAL_COUNT);
      return data.items.item;
    },
    staleTime: 1000 * 60 * 60 * 1,
  });
};
