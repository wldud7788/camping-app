import "./ChatRoom.css";

import { useParams } from "react-router-dom";
import { ChatMessageForm } from "../components/chat/ChatMessageForm";
import { ChatMessageList } from "../components/chat/ChatMessageList";
import { useContext } from "react";
import { AuthContext } from "../shared/contexts/AuthContext";

export const ChatRoom = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const roomId = params.id;

  return (
    <div className="chat_room">
      <ChatMessageList roomId={roomId} user={user} />

      <ChatMessageForm roomId={roomId} user={user} />
    </div>
  );
};
