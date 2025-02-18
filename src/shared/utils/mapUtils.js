export const initializeMap = (container, initialCenter, level = 2) => {
  const options = {
    center: new window.kakao.maps.LatLng(
      initialCenter.mapY,
      initialCenter.mapX
    ),
    level: level,
  };

  return new window.kakao.maps.Map(container, options);
};

export const moveMapCenter = (map, location) => {
  if (!map || !location) return;

  const newCenter = new window.kakao.maps.LatLng(location.mapY, location.mapX);
  map.setCenter(newCenter);
  return newCenter;
};
