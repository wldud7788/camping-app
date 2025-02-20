import { useContext } from "react";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useReadMessages } from "../../shared/hooks/chat/useReadMessages";
import { useSubscribeMessages } from "../../shared/hooks/chat/useSubscritbeMessages";
import { useCreateMessage } from "../../shared/hooks/chat/useCreateMessage";

export default function ChatRoom() {
  const params = useParams();
  const roomId = params.id;
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");

  // 메시지 Read
  const { data: messages = [] } = useReadMessages(roomId);

  // 실시간 구독
  useSubscribeMessages(roomId);

  // 메시지 Create
  const createMessageMutation = useCreateMessage(roomId);

  // 메시지 작성 함수
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    createMessageMutation.mutate({
      content: newMessage,
      userId: user.id,
    });
    setNewMessage("");
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.user_id === user?.id ? "text_right" : "text_left"
            }`}
          >
            <div>
              <div>{message.users?.name || "Unknown"}</div>
              <div>{message.content}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지 입력..."
          />
          <button type="submit">전송</button>
        </div>
      </form>
    </div>
  );
}
