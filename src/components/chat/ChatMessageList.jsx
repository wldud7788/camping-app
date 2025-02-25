import { useReadMessages } from "../../shared/hooks/chat/useReadMessages";

import PropTypes from "prop-types";
import { useSubscribeMessages } from "../../shared/hooks/chat/useSubscritbeMessages";
import { ChatMessageCard } from "./ChatMessageCard";

export const ChatMessageList = ({ roomId }) => {
  // 실시간 구독
  useSubscribeMessages(roomId);
  // 메시지 Read
  const { data: messages = [] } = useReadMessages(roomId);

  return (
    <div className="chat_message_list">
      {messages.length > 0 ? (
        messages.map((message) => (
          <ChatMessageCard key={message.id} message={message} />
        ))
      ) : (
        <div>메시지가 없습니다.</div>
      )}
    </div>
  );
};

ChatMessageList.propTypes = {
  roomId: PropTypes.string.isRequired,
};
