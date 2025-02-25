import { useState } from "react";
import { useCreateMessage } from "../../shared/hooks/chat/useCreateMessage";
import PropTypes from "prop-types";

export const ChatMessageForm = ({ roomId, user }) => {
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
const UserShape = PropTypes.shape({
  avatar_url: PropTypes.string,
  created_at: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  provider: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  updated_at: PropTypes.string,
});
ChatMessageForm.propTypes = {
  roomId: PropTypes.string.isRequired,
  user: UserShape,
};
