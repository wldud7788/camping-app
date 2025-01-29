import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { AuthContext } from "../shared/AuthContext";

const AuthForm = ({ mode }) => {
  const nav = useNavigate();
  const { isLoading, signIn, signUp } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await (mode === "signIn"
      ? signIn(formData.email, formData.password)
      : signUp(formData.email, formData.password, formData.nickname));

    if (success) {
      nav(mode === "signIn" ? "/" : "/signin");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputFields = [
    {
      type: "text",
      name: "email",
      placeholder: "이메일",
    },
    ...(mode === "signIn"
      ? []
      : [{ type: "text", name: "nickname", placeholder: "닉네임" }]),
    {
      type: "password",
      name: "password",
      placeholder: "비밀번호",
    },
  ];

  return (
    <div className="sign_up_wrapper">
      <h4>{mode === "signIn" ? "로그인" : "회원가입"}</h4>
      <form onSubmit={handleSubmit} className="sign_up_form">
        {inputFields.map((field) => (
          <div key={field.name} className="input_field">
            <label htmlFor={field.name}>{field.placeholder}</label>
            <input
              {...field}
              value={formData[field.name]}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        ))}
        <button disabled={isLoading} className="submit_button">
          {isLoading ? "처리중..." : mode === "signIn" ? "로그인" : "회원가입"}
        </button>
      </form>
      <SocialLogin />
    </div>
  );
};

export default AuthForm;
