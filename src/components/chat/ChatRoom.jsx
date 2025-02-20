import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/contexts/AuthContext";
import { supabase } from "../../shared/supabase/supabaseClient";
import { useParams } from "react-router-dom";

export default function ChatRoom() {
  const params = useParams();
  const roomId = params.id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!roomId) return;

    // 초기 메시지 로드
    loadMessages();

    // 실시간 메시지 구독
    const channel = supabase.channel(`public_room_${roomId}`).on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${roomId}`,
      },
      async (payload) => {
        // 새 메시지의 전체 정보를 조회

        // payload에서 새 메시지 데이터 추출
        const newMessage = payload.new;

        // 사용자 정보 가져오기
        const { data: userData } = await supabase
          .from("users")
          .select("avatar_url, name")
          .eq("id", newMessage.user_id)
          .single();

        // 메시지와 사용자 정보 결합
        const messageWithUser = {
          ...newMessage,
          users: userData,
        };

        setMessages((current) => [...current, messageWithUser]);
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, [roomId]);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(
        `*,
        users (
    avatar_url,
    name
  )`
      )
      .eq("room_id", roomId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading messages:", error);
      return;
    }

    setMessages(data || []);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    // insert 후 바로 users정보까지 select
    const { data, error } = await supabase
      .from("messages")
      .insert({
        content: newMessage,
        room_id: roomId,
        user_id: user.id,
      })
      .select(
        `*,
      users:user_id (
        avatar_url,
        name
      )`
      )
      .single();

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    setMessages((current) => [...current, data]);
    setNewMessage("");
  };

  return (
    // {selectedRoomId && <ChatRoom roomId={selectedRoomId} />}
    <div className="flex flex-col h-screen">
      {/* 메시지 목록 */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.user_id === user?.id ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.user_id === user?.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <div className="text-sm font-bold">
                {message.users?.name || "Unknown"}
              </div>
              <div>{message.content}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력 */}
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지 입력..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
}
