import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase/supabaseClient";
export const useSubscribeMessages = (roomId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`messages:${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        async (payload) => {
          const currentMessages =
            queryClient.getQueryData(["messages", roomId]) || [];

          if (payload.eventType === "INSERT") {
            const isExist = currentMessages.some(
              (message) => message.id === payload.new.id
            );
            if (!isExist) {
              queryClient.setQueryData(
                ["messages", roomId],
                [...currentMessages, payload.new]
              );
            }
          } else if (payload.eventType === "UPDATE") {
            queryClient.setQueryData(
              ["messages", roomId],
              currentMessages.map((message) =>
                message.id === payload.new.id ? payload.new : message
              )
            );
          } else if (payload.eventType === "DELETE") {
            queryClient.setQueryData(
              ["messages", roomId],
              currentMessages.filter((message) => message.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient, roomId]);
};
