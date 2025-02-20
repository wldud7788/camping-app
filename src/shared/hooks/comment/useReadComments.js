import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabaseClient";

export const useReadComment = (contentId) => {
  const QUERY_KEY = ["comments", contentId];
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comment")
        .select(
          /** 
        users테이블과 조인, user_id를 forign key로 사용
        avatar_url, email => users테이블에서 가져올 필드
        **/
          `
            *,
            users: user_id(
                avatar_url,    
                name          
            )
        `
        )
        .eq("content_id", contentId)
        .order("created_at", { ascending: true });

      if (error) {
        throw error;
      }
      return data;
    },
  });
};
