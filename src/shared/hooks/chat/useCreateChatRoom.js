import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabaseClient";

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, userId }) => {
      const { data, error } = await supabase
        .from("rooms")
        .insert({
          name,
          type: "group",
          participants: [`${userId}`],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (newRoom) => {
      const currentRooms = queryClient.getQueryData(["rooms"]) || [];
      const isExist = currentRooms.some((room) => room.id === newRoom.id);

      if (!isExist) {
        queryClient.setQueryData(["rooms"], [newRoom, ...currentRooms]);
      }
    },
  });
};
