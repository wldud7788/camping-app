import { createContext } from "react";
import { validateForm } from "../../components/auth/validators";
import { toast } from "react-toastify";
import { ERROR_MESSAGES } from "../constants/messages";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, isLoading, setIsLoading, user, setUser } = useAuth();

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
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
    return !error;
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
