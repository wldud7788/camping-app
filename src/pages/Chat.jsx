import "./Chat.css";
import { ChatRoomForm } from "../components/chat/ChatRoomForm";
import { ChatRoomList } from "../components/chat/ChatRoomList";

export const Chat = () => {
  return (
    <div className="chat_list_wrapper">
      <div className="title">채팅방을 만들고 소통해보세요!</div>
      <ChatRoomForm />
      <ChatRoomList />
    </div>
  );
};
