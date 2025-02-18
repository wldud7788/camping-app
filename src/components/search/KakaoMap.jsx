import { useNavigate } from "react-router-dom";
import "./KakaoMap.css";
import { useEffect, useState } from "react";
const { kakao } = window;

export const KakaoMap = ({ displayData, isLoading, selectedCamping }) => {
  const nav = useNavigate();
  // 초기 지도의 위도 경도값 저장
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.5666805,
    longitude: 126.9784147,
  });
  const { latitude, longitude } = currentLocation;

  useEffect(() => {
    // 데이터 로딩 완료 후 위치 업데이트

    if (!selectedCamping && !isLoading && displayData?.[0]) {
      // 검색결과의 첫 번째 위도 경도 세팅
      setCurrentLocation({
        latitude: displayData[0].mapY,
        longitude: displayData[0].mapX,
      });
    }
  }, [isLoading, displayData]);

  // selectedComaping이 변경될때마다 실행
  useEffect(() => {
    if (selectedCamping) {
      setCurrentLocation({
        latitude: selectedCamping.mapY,
        longitude: selectedCamping.mapX,
      });
    }
  }, [selectedCamping]);

  // 데이터 로딩 완료 후 위치 업데이트
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    // 마커가 표시될 위치
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    if (selectedCamping) {
      // 마커에 클릭 이벤트를 등록하고 싶다면
      kakao.maps.event.addListener(marker, "click", function () {
        nav(`/camping/${selectedCamping?.contentId}`);
      });

      // 인포 윈도우를 설정
      const infoWindowContent = `<div><p>${selectedCamping?.facltNm}</p><p>${selectedCamping?.addr1}</p></div>`;
      const infoWindow = new kakao.maps.InfoWindow({
        content: infoWindowContent,
      });

      // 마커에 마우스 오버 이벤트를 등록하면 인포 윈도우가 표시
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infoWindow.open(map, marker);
      });

      // 마커에 마우스 아웃 시 인포윈도우 닫기
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infoWindow.close();
      });
    }
    return () => {
      marker.setMap(null);
    };
  }, [latitude, longitude, selectedCamping, nav]);
  console.log(selectedCamping);

  return (
    <div id="map">
      <a href=""></a>
    </div>
  );
};
