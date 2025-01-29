import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <header className="header">
      <Link to="/">
        <img src="/logo.png" alt="홈으로가기" />
      </Link>
      <div>
        {user ? (
          <div className="user_img">
            <Link to="/mypage">
              {user.avatar_url ? (
                <img src={user.avatar_url} />
              ) : (
                <img src="/default_icon.png" />
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
