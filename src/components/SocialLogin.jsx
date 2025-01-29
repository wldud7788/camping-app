import { supabase } from "../supabaseClient";

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
      <button onClick={signInWithKakao}>카카오로그인</button>
      <button onClick={signInWithGoogle}>구글로그인</button>
    </div>
  );
}
