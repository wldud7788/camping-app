import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabaseClient";

export const useJoinRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ roomId, userId }) => {
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("participants")
        .eq("id", roomId)
        .single();

      if (roomError) throw roomError;

      const newParticipants = [...roomData.participants, userId];

      const { data, error: updateError } = await supabase
        .from("rooms")
        .update({ participants: newParticipants })
        .eq("id", roomId)
        .select()
        .single();

      if (updateError) throw updateError;
      return data;
    },
    onSuccess: (updatedRoom) => {
      queryClient.setQueryData(["rooms"], (old) => {
        return old?.map((room) =>
          room.id === updatedRoom.id ? updatedRoom : room
        );
      });

      alert("채팅방 참가 신청이 완료되었습니다.");
    },
    onError: (error) => {
      console.error("채팅방 참가 신청 에러", error);
      alert("채팅방 참가 신청에 실패했습니다.");
    },
  });
};
