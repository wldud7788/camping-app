import { useContext } from "react";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { format } from "date-fns";
import PropTypes from "prop-types";

export const ChatMessageCard = ({ message }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className={`mb-4 ${message.user_id === user?.id && "text_right"}`}>
      <div className="chat_message_profile">
        {message.user_id !== user?.id && (
          <img
            src={message.users.avatar_url || "/icon/ico_default_profile.png"}
            alt="프로필이미지"
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
  );
};
const UserShape = PropTypes.shape({
  avatar_url: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

const MessageShape = PropTypes.shape({
  content: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  room_id: PropTypes.string.isRequired,
  type: PropTypes.string,
  user_id: PropTypes.string.isRequired,
  users: UserShape.isRequired,
});

ChatMessageCard.propTypes = {
  message: MessageShape.isRequired,
};
