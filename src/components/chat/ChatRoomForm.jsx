import { useContext, useState } from "react";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { useCreateChatRoom } from "../../shared/hooks/chat/useCreateChatRoom";

export const ChatRoomForm = () => {
  const { user } = useContext(AuthContext);
  const [roomName, setRoomName] = useState("");
  // 채팅방 CREATE
  const createRoomMutation = useCreateChatRoom(() => {
    setRoomName("");
  });

  // 채팅방 생성 핸들러
  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if (!roomName.trim()) {
      alert("채팅방 이름을 입력해주세요");
      return;
    }
    createRoomMutation.mutate({ name: roomName, userId: user.id });
  };

  return (
    <form onSubmit={handleCreateRoom} className="chat_list_form">
      <input
        placeholder="채팅방 이름을 입력하세요"
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button>채팅방 만들기</button>
    </form>
  );
};
