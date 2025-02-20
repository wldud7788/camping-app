import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";

export const useUpdateComment = (contentId) => {
  const QUERY_KEY = ["comments", contentId];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ updateId, content }) => {
      const { data, error } = await supabase
        .from("comment")
        .update({ content })
        .eq("id", updateId).select(`
            *,
            users:user_id (
              avatar_url,
              email
            )
          `);

      if (error) {
        throw error;
      }
      return data;
    },
    onMutate: async ({ updateId, content }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY,
      });

      // 이전 값 저장
      const previousComments = queryClient.getQueryData(QUERY_KEY);

      // 낙관적 업데이트
      queryClient.setQueryData(QUERY_KEY, (old = []) => {
        old.map((comment) =>
          comment.id === updateId ? { ...comment, content } : comment
        );
      });
      return { previousComments };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousComments);
      console.error("댓글 수정 중 오류가 발생했습니다.", error.message);
      alert("댓글 수정 중 오류가 발생했습니다.");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      alert("댓글이 수정되었습니다.");
    },
  });
};
