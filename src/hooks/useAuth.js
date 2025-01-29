import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkSession = async (session) => {
    try {
      if (session) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("session체크 오류", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 초기 세션 체크
    supabase.auth.getSession().then((res) => {
      const session = res.data.session;
      setIsAuthenticated(!!session);
      checkSession(session);
    });

    // 인증 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      checkSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return { isAuthenticated, isLoading, setIsLoading, user, setUser };
};
