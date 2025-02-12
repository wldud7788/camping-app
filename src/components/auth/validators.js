import { toast } from "react-toastify";
import { supabase } from "../../shared/supabase/supabaseClient";
import { ERROR_MESSAGES } from "../../shared/constants/messages";

export const validateForm = async (email, password, mode) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    toast.error(ERROR_MESSAGES.INVALID_EMAIL);
    return false;
  }

  if (password.length < 6) {
    toast.error(ERROR_MESSAGES.SHORT_PASSWORD);
    return false;
  }

  if (mode === "signUp") {
    const { data } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (data?.length > 0) {
      toast.error(ERROR_MESSAGES.EMAIL_EXISTS);
      return false;
    }
  }

  return true;
};
