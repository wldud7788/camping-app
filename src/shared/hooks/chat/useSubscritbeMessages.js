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
          // 새 메시지가 생성되면
          if (payload.new) {
            // 현재 캐시된 메시지 목록을 가져옴
            const currentMessages =
              queryClient.getQueryData(["messages", roomId]) || [];

            // 중복 체크
            const isExist = currentMessages.some(
              (message) => message.id === payload.new.id
            );
            if (!isExist) {
              // 새 메시지의 상세 정보를 조회
              const { data: messageData } = await supabase
                .from("messages")
                .select(
                  `
              *,
              users:user_id (
                id,
                name
              )
            `
                )
                .eq("id", payload.new.id)
                .single();

              if (messageData) {
                // 새 메시지를 기존 목록에 추가
                queryClient.setQueryData(
                  ["messages", roomId],
                  [...currentMessages, messageData]
                );
              }
            }
          }
        }
      )
      .subscribe();

    // 클린업: 구독 해제
    return () => {
      channel.unsubscribe();
    };
  }, [roomId, queryClient]);
};
