import "./Mypage.css";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../../shared/supabase/supabaseClient";
import { AuthContext } from "../../shared/contexts/AuthContext";
const Mypage = () => {
  const { user, isLoading, signOut, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
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
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile);

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName);

        avatarUrl = publicUrl;
        console.log("publicUrl", publicUrl);
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
    <>
      {isEditing ? (
        <>
          <div className="profile_avatar_wrapper">
            {previewUrl ? (
              <img src={previewUrl} alt="미리보기유저이미지" />
            ) : user.avatar_url ? (
              <img src={user.avatar_url} alt="유저이미지" />
            ) : (
              <img src="/icon/ico_default_profile.png" alt="기본 유저 이미지" />
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div>
              <button type="button" onClick={handleCancel}>
                취소
              </button>
              <button type="submit">수정하기</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="profile_avatar_wrapper">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="유저이미지" />
            ) : (
              <img src="/icon/ico_default_profile.png" alt="기본 유저 이미지" />
            )}
          </div>
          <div>유저 Email: {user.email}</div>
          <div>유저의 닉네임: {user.name}</div>
          <button onClick={() => setIsEditing(true)}>프로필 수정하기</button>
          <button onClick={signOut}>로그아웃</button>
        </>
      )}
    </>
  );
};

export default Mypage;
