import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "./useAuth";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const { userId } = useAuth();

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.log("fetchUser에러", error);
        return;
      }
      setUser(data);
    };

    fetchUser();
  }, [userId]);

  return { user, setUser };
};
