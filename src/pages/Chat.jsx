import { useContext, useEffect, useState } from "react";
import { supabase } from "../shared/supabase/supabaseClient";
import { AuthContext } from "../shared/contexts/AuthContext";
import { Link } from "react-router-dom";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    const loadRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("방 목록 로딩 에러:", error);
        return;
      }

      setRooms(data);
      // 첫 번째 방을 선택
      if (data.length > 0 && !selectedRoomId) {
        setSelectedRoomId(data[0].id);
      }
    };

    loadRooms();
  }, []);

  // 새 채팅방 생성 함수 (버튼 클릭시에만 호출)
  const handleCreateRoom = async () => {
    const { data: room, error } = await supabase
      .from("rooms")
      .insert({
        name: roomName,
        type: "group",
        participants: [`${user.id}`],
      })
      .select()
      .single();

    if (error) {
      console.error("방 생성 에러:", error);
      return;
    }

    setRooms((prev) => [room, ...prev]);
    setSelectedRoomId(room.id);
  };

  // 채팅방 신청하기 함수
  const handleRequestRoom = async () => {
    const { data: roomData, error: roomError } = await supabase
      .from("rooms")
      .select("participants")
      .eq("id", selectedRoomId)
      .single();

    if (roomError) {
      console.error("채팅방 정보 조회 에러:", roomError.message);
      return;
    }

    // 3. 새로운 participants 배열
    const newParticipants = [...roomData.participants, user.id];

    // 4. 업데이트 요청
    const { error: updateError } = await supabase
      .from("rooms")
      .update({ participants: newParticipants })
      .eq("id", selectedRoomId);

    if (updateError) {
      console.error("채팅방 신청 에러", updateError.message);
      return;
    }
    console.log("채팅방 신청 완료");
  };

  return (
    <main>
      <div>
        <form onSubmit={handleCreateRoom}>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button>새 채팅방 만들기</button>
        </form>

        <div>
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => setSelectedRoomId(room.id)}
              style={{
                cursor: "pointer",
                backgroundColor: selectedRoomId === room.id ? "#eee" : "white",
              }}
            >
              <Link to={`/chat/${room.id}`}>{room.name}</Link>
              <button onClick={handleRequestRoom}>채팅 신청하기</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
