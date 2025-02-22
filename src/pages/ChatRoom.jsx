import "./ChatRoom.css";
import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../shared/contexts/AuthContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useReadMessages } from "../shared/hooks/chat/useReadMessages";
import { useSubscribeMessages } from "../shared/hooks/chat/useSubscritbeMessages";
import { useCreateMessage } from "../shared/hooks/chat/useCreateMessage";

export const ChatRoom = () => {
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
    <div className="chat_room">
      <div className="chat_room_list">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.user_id === user?.id && "text_right"}`}
            >
              <div className="chat_room_profile">
                {message.user_id !== user?.id && (
                  <img
                    src={
                      message.users.avatar_url ||
                      "/icon/ico_default_profile.png"
                    }
                    alt=""
                  />
                )}

                <div>
                  {message.user_id !== user.id && (
                    <div>{message.users.name || "Unknown"}</div>
                  )}
                  <div
                    className={`${
                      message.user_id === user?.id ? "my_message" : "message"
                    }`}
                  >
                    {message.content}
                  </div>
                  <span className="date">
                    {format(new Date(message.created_at), "MM.dd HH:mm")}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>메시지가 없습니다.</div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat_room_form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="메시지 입력..."
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};
