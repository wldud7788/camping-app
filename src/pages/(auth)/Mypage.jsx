import "./Mypage.css";
import { useState } from "react";
import { MypageProfile } from "../../components/auth/MypageProfile";
import { MypageEdit } from "../../components/auth/MyPageEdit";
const Mypage = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="mypage">
      {!isEditing ? (
        <MypageProfile setIsEditing={setIsEditing} />
      ) : (
        <MypageEdit setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default Mypage;
