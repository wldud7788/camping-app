import { useReadMessages } from "../../shared/hooks/chat/useReadMessages";
import { format } from "date-fns";
import PropTypes from "prop-types";
import { useSubscribeMessages } from "../../shared/hooks/chat/useSubscritbeMessages";

export const ChatMessageList = ({ roomId, user }) => {
  // 실시간 구독
  useSubscribeMessages(roomId);
  // 메시지 Read
  const { data: messages = [] } = useReadMessages(roomId);

  return (
    <div className="chat_message_list">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.user_id === user?.id && "text_right"}`}
          >
            <div className="chat_message_profile">
              {message.user_id !== user?.id && (
                <img
                  src={
                    message.users.avatar_url || "/icon/ico_default_profile.png"
                  }
                  alt=""
                />
              )}

              <div>
                {message.user_id !== user?.id && (
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
ChatMessageList.propTypes = {
  roomId: PropTypes.string.isRequired,
  user: UserShape,
};
