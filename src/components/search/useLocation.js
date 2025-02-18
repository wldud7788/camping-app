import { useEffect, useState } from "react";

export default function useLocation() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      // Geolocation API를 사용하여 현재 위치를 가져오기
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      // 위치 정보를 성공적으로 가져왔을 때의 처리
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function error() {
      // 위치 정보를 가져오는 데 실패했을 때의 처리
      setLocation({
        latitude: 37.483034,
        longitude: 126.902435,
      });
      console.log("위치 받기 실패");
    }
  }, []);

  return location;
}
