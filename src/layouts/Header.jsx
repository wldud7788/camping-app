import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../shared/contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
    <header className="header hidden_mb">
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
    {/* 모바일용 */}
    <header className="header hidden_pc">
      <Link className="logo" to="/">
        <img src="/logo/logo.png" alt="홈으로가기" />
      </Link>
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
    <nav className="bottom_nav">
      <Link  to="/">
        <img src="/icon/nav_home.svg" alt="홈" />
        <span>홈</span>
      </Link>
        
        <Link to="/camping"><img src="/icon/nav_camp.svg" alt="캠핑장" />
        <span>둘러보기</span></Link>
        
        <Link  to="/search"><img src="/icon/nav_search.svg" alt="검색" />
        <span>검색</span></Link>
        
        <Link  to="/chat"><img src="/icon/nav_chat.svg" alt="채팅" />
        <span>채팅</span></Link>
        
        <Link  to="/mypage"><img src="/icon/nav_mypage.svg" alt="마이페이지" />
        <span>마이페이지</span></Link>

    </nav>
    </>
  );
};
export default Header;
