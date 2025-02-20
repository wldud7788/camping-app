import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabaseClient";

export const useCreateMessage = (roomId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, userId }) => {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          content,
          room_id: roomId,
          user_id: userId,
        })
        .select(
          `
          *,
          users:user_id (
            id,
            name
          )
        `
        )
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (newMessage) => {
      const currentMessages =
        queryClient.getQueryData(["messages", roomId]) || [];
      const isExist = currentMessages.some(
        (message) => message.id === newMessage.id
      );

      if (!isExist) {
        queryClient.setQueryData(
          ["messages", roomId],
          [...currentMessages, newMessage]
        );
      }
    },
  });
};
