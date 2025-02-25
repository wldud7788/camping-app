import { useContext, useState } from "react";
import { useCreateMessage } from "../../shared/hooks/chat/useCreateMessage";
import PropTypes from "prop-types";
import { AuthContext } from "../../shared/contexts/AuthContext";

export const ChatMessageForm = ({ roomId }) => {
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  // 메시지 Create 함수
  const createMessageMutation = useCreateMessage(roomId);

  // 메시지 작성 핸들러
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    createMessageMutation.mutate({
      content: newMessage,
      userId: user?.id,
    });
    setNewMessage("");
  };

  return (
    <form onSubmit={handleSendMessage} className="chat_message_form">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="메시지 입력..."
      />
      <button type="submit">전송</button>
    </form>
  );
};

ChatMessageForm.propTypes = {
  roomId: PropTypes.string.isRequired,
};
