import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";

export const useDeleteComment = (contentId) => {
  const QUERY_KEY = ["comments", contentId];
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deleteId) => {
      const { data, error } = await supabase
        .from("comment")
        .delete()
        .eq("id", deleteId)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },

    onMutate: async (deleteId) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEY,
      });
      const previousComments = queryClient.getQueryData(QUERY_KEY);

      queryClient.setQueryData(QUERY_KEY, (old = []) =>
        old?.filter((comment) => comment.id !== deleteId)
      );

      return { previousComments };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(QUERY_KEY, context?.previousComments);
      console.error("댓글 삭제 중 오류가 발생했습니다.", error.message);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      alert("댓글 삭제 완료!");
    },
  });
};
