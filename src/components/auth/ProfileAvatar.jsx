import { useContext } from "react";
import { AuthContext } from "../../shared/contexts/AuthContext";
import PropTypes from "prop-types";

export const ProfileAvatar = ({ previewUrl }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="profile_avatar_wrapper">
      {previewUrl ? (
        <img src={previewUrl} alt="미리보기유저이미지" />
      ) : user.avatar_url ? (
        <img src={user.avatar_url} alt="유저이미지" />
      ) : (
        <img src="/icon/ico_default_profile.png" alt="기본 유저 이미지" />
      )}
    </div>
  );
};

ProfileAvatar.propTypes = {
  previewUrl: PropTypes.string,
};
