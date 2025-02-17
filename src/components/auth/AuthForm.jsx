import "./AuthForm.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "@/shared/contexts/AuthContext";
import SocialLogin from "./SocialLogin";

export const AuthForm = ({ mode }) => {
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

  const handleClick = () => {
    nav(mode === "signIn" ? "/signUp" : "/signIn");
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
    <div className="auth_form_wrapper">
      <div className="auth_form">
        <div className="auth_image_wapper">
          <img src="/bg/bg_auth_form.png" alt="캠핑일러스트" />
        </div>
        <div className="auth_input_wrapper">
          <h4>{mode === "signIn" ? "로그인" : "회원가입"}</h4>
          <form onSubmit={handleSubmit}>
            {inputFields.map((field) => {
              return (
                <div key={field.name}>
                  <label htmlFor={field.name}>{field.placeholder}</label>
                  <input
                    {...field}
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              );
            })}
            <button>
              {isLoading
                ? "처리중..."
                : mode === "signIn"
                ? "로그인"
                : "회원가입"}
            </button>
            <button
              className="auth_toggle_btn"
              type="button"
              onClick={handleClick}
            >
              {mode === "signIn" ? "회원가입" : "로그인"} 하러가기
            </button>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  mode: PropTypes.oneOf(["signIn", "signUp"]).isRequired,
};
