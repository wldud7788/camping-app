import { useContext } from "react";
import { useJoinRoom } from "../../shared/hooks/chat/useJoinRoom";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ChatRoomCard = ({ rooms, room }) => {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  // 사용자 방 참가 권한 체크
  const checkRoomAccess = (roomId) => {
    if (!user) return false;
    const selectedRoom = rooms.find((room) => room.id === roomId);

    if (!selectedRoom) return false;
    return selectedRoom.participants?.includes(user.id);
  };

  // 방 선택 핸들러
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

  // 방 참가 mutation
  const joinRoomMutation = useJoinRoom();

  return (
    <div className="chat_list_card" onClick={() => handleRoomSelect(room.id)}>
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
          채팅신청
        </button>
      )}
    </div>
  );
};
const RoomShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
});
ChatRoomCard.propTypes = {
  rooms: PropTypes.arrayOf(RoomShape).isRequired,
  room: RoomShape.isRequired,
};
