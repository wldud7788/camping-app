import { useContext } from "react";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { ProfileAvatar } from "./ProfileAvatar";
import PropTypes from "prop-types";

export const MypageProfile = ({ setIsEditing }) => {
  const { user, signOut } = useContext(AuthContext);
  return (
    <div className="mypage_profile">
      <ProfileAvatar />
      <div className="profile_info">
        <dl>
          <dt>유저의 닉네임</dt>
          <dd> {user.name}</dd>
        </dl>
        <dl>
          <dt>유저 이메일</dt>
          <dd>{user.email}</dd>
        </dl>
        <button className="btn_orange" onClick={() => setIsEditing(true)}>
          프로필 수정하기
        </button>
        <button className="btn_white" onClick={signOut}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

MypageProfile.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
};
