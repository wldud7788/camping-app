import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabaseClient";

export const useReadMessages = (roomId) => {
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `
        *,
        users:user_id (
          id,
          name,
          avatar_url
        )
      `
      )
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  };

  return useQuery({
    queryKey: ["messages", roomId],
    queryFn: fetchMessages,
    enabled: !!roomId, // roomId가 있을 때만 쿼리 실행
  });
};
