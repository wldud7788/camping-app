import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "./useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useCreateComment = (contentId) => {
  const { user } = useAuth();
  const QUERY_KEY = ["comments", contentId];

  // Reqct Query의 캐시를 관리하는 클라이언트 인스턴스
  const queryClient = useQueryClient();

  // useMutation 훅을 사용하여 댓글 작성 기능 구현
  return useMutation({
    // 실제 데이터베이스에 댓글을 추가하는 함수
    mutationFn: async (commentobj) => {
      const { data, error } = await supabase
        .from("comment")
        .insert([commentobj]).select(`*,
            users:user_id (
              avatar_url,
              email
            )`);

      if (error) {
        throw error;
      }
      return data;
    },
    // 서버 요청 전에 실행되는 함수 - 낙관적 업데이트
    onMutate: async (commentobj) => {
      /** 
        진행중인 댓글 관련 쿼리들을 취소
        이 부분이 없다면
        1. 낙관적 업데이트로 새 댓글 추가
        2. 동시에 실행중이던 쿼리가 완료
        3. 쿼리 결과로 UI가 갱신되면서 낙관적 업데이트가 덮어씌워질 수 있음 
      **/
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY,
      });
      // 이전 상태 저장
      const previousComments = queryClient.getQueryData(QUERY_KEY) || [];

      // 새 댓글 추가
      queryClient.setQueryData(QUERY_KEY, (old = []) => [
        ...old,
        {
          ...commentobj,
          id: Date.now(),
          create_at: new Date().toISOString(),
          users: {
            avatar_url: user?.avatar_url,
            name: user?.name,
          },
        },
      ]);
      return { previousComments };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousComments);
      console.error("댓글 작성 중 오류가 발생했습니다.", error.message);
      alert("댓글 작성 중 오류가 발생했습니다.");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      alert("댓글이 작성되었습니다.");
    },
  });
};
