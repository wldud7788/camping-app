import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <header className="header">
      <Link to="/">
        <img src="/logo/logo.png" alt="홈으로가기" />
      </Link>
      <div>
        {user ? (
          <div className="user_img">
            <Link to="/mypage">
              {user.avatar_url ? (
                <img src={user.avatar_url} />
              ) : (
                <img src="/icon/ico_default_profile.png" />
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
// <img src={user.avatar_url} />
export default Header;
