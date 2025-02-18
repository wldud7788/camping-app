export const createMarker = (position, map) => {
  const marker = new window.kakao.maps.Marker({
    position: position,
  });

  marker.setMap(map);
  return marker;
};

export const setupMarkerEvents = (marker, map, location, nav) => {
  // 인포윈도우 설정
  const infoWindowContent = `<div><p>${location.facltNm}</p><p>${location.addr1}</p></div>`;
  const infoWindow = new window.kakao.maps.InfoWindow({
    content: infoWindowContent,
  });

  // 마커 이벤트 등록
  window.kakao.maps.event.addListener(marker, "click", function () {
    nav(`/camping/${location.contentId}`);
  });

  window.kakao.maps.event.addListener(marker, "mouseover", function () {
    infoWindow.open(map, marker);
  });

  window.kakao.maps.event.addListener(marker, "mouseout", function () {
    infoWindow.close();
  });
};
