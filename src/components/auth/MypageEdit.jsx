import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { supabase } from "../../shared/supabase/supabaseClient";
import { ProfileAvatar } from "./ProfileAvatar";
import PropTypes from "prop-types";

export const MypageEdit = ({ setIsEditing }) => {
  const { user, isLoading, setUser } = useContext(AuthContext);
  const [newName, setNewName] = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let avatarUrl = user.user_metadata?.avatar_url;

      if (avatarFile) {
        const fileName = `${user.id}-${Date.now()}`;
        const { error } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile);

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName);

        avatarUrl = publicUrl;
      }

      // user테이블 업데이트
      const { error } = await supabase
        .from("users")
        .update({
          name: newName,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (error) throw error;
      alert("프로필이 업데이트 되었습니다.");
      setIsEditing(false);
      setUser({
        ...user,
        name: newName,
        avatar_url: avatarFile ? avatarUrl : user.avatar_url,
      });
    } catch (error) {
      console.error(error);
      alert("업데이트 실패");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewUrl(null);
    setAvatarFile(null);
    setNewName(user?.name || "");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>사용자 정보가 없습니다.</div>;
  }
  return (
    <div className="mypage_edit">
      <ProfileAvatar previewUrl={previewUrl} />
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="btn_orange " type="submit">
          수정하기
        </button>
        <button className="btn_white" type="button" onClick={handleCancel}>
          취소
        </button>
      </form>
    </div>
  );
};

MypageEdit.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
};
