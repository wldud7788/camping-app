import { useContext, useState } from "react";
import { AuthContext } from "../shared/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useReadChatRooms } from "../shared/hooks/chat/useReadChatRooms";
import { useJoinRoom } from "../shared/hooks/chat/useJoinRoom";
import { useCreateChatRoom } from "../shared/hooks/chat/useCreateChatRoom";
import { useSubscribeRooms } from "../shared/hooks/chat/useSubscribeRooms";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const [roomName, setRoomName] = useState("");
  const nav = useNavigate();

  // 실시간 구독 부분
  useSubscribeRooms();

  // 채팅방 READ
  const { data: rooms = [] } = useReadChatRooms();

  // 채팅방 CREATE
  const createRoomMutation = useCreateChatRoom(() => {
    setRoomName("");
  });

  // 사용자 방 참가 권한 체크
  const checkRoomAccess = (roomId) => {
    if (!user) return false;
    const selectedRoom = rooms.find((room) => room.id === roomId);

    if (!selectedRoom) return false;
    return selectedRoom.participants?.includes(user.id);
  };

  // 방 참가 mutation
  const joinRoomMutation = useJoinRoom();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인 후 이용해주세요");
      return;
    }
    if (!roomName.trim()) return;
    createRoomMutation.mutate({ name: roomName, userId: user.id });
  };

  const handleRoomSelect = (roomId) => {
    if (!checkRoomAccess(roomId)) {
      if (!user) {
        alert("로그인 후 이용해주세요");
        return;
      }
      alert("권한이 없습니다. 채팅 신청을 하신 후 이용해주세요");
      return;
    }
    nav(`/chat/${roomId}`);
  };
  return (
    <main>
      <div>
        <form onSubmit={handleCreateRoom}>
          <input
            placeholder="채팅방 이름을 입력하세요"
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button>새 채팅방 만들기</button>
        </form>

        <div className="chat_list">
          {rooms.map((room) => (
            <div key={room.id} onClick={() => handleRoomSelect(room.id)}>
              {room.name}
              {!checkRoomAccess(room.id) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    joinRoomMutation.mutate({
                      roomId: room.id,
                      userId: user.id,
                    });
                  }}
                >
                  채팅신청하기
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
