import { supabase } from "@/shared/supabase/supabaseClient";

export default function SocialLogin() {
  async function signInWithKakao() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
      });
      if (error) throw error.message;
    } catch (error) {
      console.error(error);
    }
  }
  async function signInWithGoogle() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error.message;
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="social_wrapper">
      <h5>소셜로 간편하게 로그인하세요!</h5>
      <button className="kakao" onClick={signInWithKakao}>
        카카오로그인
      </button>
      <button className="google" onClick={signInWithGoogle}>
        구글로그인
      </button>
    </div>
  );
}
