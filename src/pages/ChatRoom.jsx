import "./ChatRoom.css";

import { useParams } from "react-router-dom";
import { ChatMessageForm } from "../components/chat/ChatMessageForm";
import { ChatMessageList } from "../components/chat/ChatMessageList";

export const ChatRoom = () => {
  const params = useParams();
  const roomId = params.id;

  return (
    <div className="chat_room">
      <ChatMessageList roomId={roomId} />

      <ChatMessageForm roomId={roomId} />
    </div>
  );
};
