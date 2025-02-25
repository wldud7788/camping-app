import { useReadChatRooms } from "../../shared/hooks/chat/useReadChatRooms";
import { useSubscribeRooms } from "../../shared/hooks/chat/useSubscribeRooms";

import { ChatRoomCard } from "./ChatRoomCard";

export const ChatRoomList = () => {
  // 실시간 구독 부분
  useSubscribeRooms();

  // 채팅방 READ
  const { data: rooms = [] } = useReadChatRooms();

  return (
    <div className="chat_list">
      <div className="title">채팅 신청 후 입장해서 소통해보세요</div>
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <ChatRoomCard key={room.id} rooms={rooms} room={room} />
        ))
      ) : (
        <div>아직 생성된 채팅방이 없습니다.</div>
      )}
    </div>
  );
};
