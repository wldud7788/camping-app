import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";

export const useSubscribeRooms = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel("public:rooms")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "rooms",
        },
        async (payload) => {
          const currentRooms = queryClient.getQueryData(["rooms"]) || [];

          switch (payload.eventType) {
            case "INSERT": {
              const isExist = currentRooms.some(
                (room) => room.id === payload.new.id
              );
              if (!isExist) {
                queryClient.setQueryData(
                  ["rooms"],
                  [payload.new, ...currentRooms]
                );
              }
              break;
            }
            case "UPDATE": {
              queryClient.setQueryData(
                ["rooms"],
                currentRooms.map((room) =>
                  room.id === payload.new.id ? payload.new : room
                )
              );
              break;
            }
            case "DELETE": {
              queryClient.setQueryData(
                ["rooms"],
                currentRooms.filter((room) => room.id !== payload.old.id)
              );
              break;
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [queryClient]);
};
