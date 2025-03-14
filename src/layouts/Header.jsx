import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <header className="header">
      <Link className="logo" to="/">
        <img src="/logo/logo.png" alt="홈으로가기" />
      </Link>
      <nav>
        <Link to="/search">캠핑장 검색</Link>
        <Link to="/camping">캠핑장 둘러보기</Link>
        <Link to="/chat">채팅</Link>
      </nav>
      <div>
        {user ? (
          <div className="user_img">
            <Link to="/mypage">
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="유저 프로필 이미지" />
              ) : (
                <img
                  src="/icon/ico_default_profile.png"
                  alt="유저 기본 프로필 이미지"
                />
              )}
            </Link>
          </div>
        ) : (
          <Link to="/signin">로그인</Link>
        )}
      </div>
    </header>
  );
};
export default Header;
