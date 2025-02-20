import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabaseClient";

export const useReadChatRooms = () => {
  // 채팅방 데이터 가져오기
  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  };

  return useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });
};
