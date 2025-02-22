import { createContext } from "react";
import { validateForm } from "../../components/auth/validators";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../constants/messages";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    user,
    setUser,
  } = useAuth();

  const signUp = async (email, password, nickname) => {
    setIsLoading(true);
    try {
      if (!(await validateForm(email, password, "signUp"))) return false;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: nickname,
          },
        },
      });

      if (error) {
        toast.error(ERROR_MESSAGES.EMAIL_EXISTS);
        return false;
      }

      toast.success(ERROR_MESSAGES.SIGN_UP_SUCCESS);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      if (!(await validateForm(email, password, "signIn"))) return false;

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(ERROR_MESSAGES.SIGN_IN_ERROR);
        return false;
      }

      toast.success(ERROR_MESSAGES.SIGN_IN_SUCCESS);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);

      // 세션 리프레시
      // 로그인한지 오래되면, 에러가 발생함
      // 장시간 로그인 상태가 유지된 세션에서 발생함
      // 토큰이 유효해 보이더라도 서버 측에서 세션을 이미 만료했기 때문에
      // 로그아웃 처리가 정상적으로 되지 않는 이슈로
      // 세션 리프레시가 실패하면 로컬 상태를 클린업;
      const {
        data: { session },
        error: refreshError,
      } = await supabase.auth.refreshSession();
      if (refreshError) {
        console.error("세션 리프레시 실패");
        // 새션 레프레시 실패 시 로컬 클린업
        localStorage.clear();
        setUser(null);
        setIsAuthenticated(false);
        return true;
      }

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("로그아웃 리프레시 에러", error);
        localStorage.clear();
      }

      setUser(null);
      setIsAuthenticated(false);

      return true;
    } catch (error) {
      console.error("로그아웃 에러", error);

      // 예상치 못한 에러 발생시에도 로컬 상태 초기화
      localStorage.clear();
      setUser(null);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        signIn,
        signUp,
        signOut,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
