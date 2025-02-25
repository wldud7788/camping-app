import { useNavigate } from "react-router-dom";
import "./KakaoMap.css";
import { useEffect, useState } from "react";
import {
  createMarker,
  setupMarkerEvents,
} from "../../shared/hooks/map/useKakaoMapMarker";
import { useKakaoMapScript } from "../../shared/hooks/map/useKakaoMapScript";

import PropTypes from "prop-types";
import { initializeMap, moveMapCenter } from "../../shared/utils/mapUtils";

export const KakaoMap = ({ displayData, selectedCamping }) => {
  const nav = useNavigate();
  const { mapLoaded } = useKakaoMapScript();
  const [map, setMap] = useState(null);

  // 초기값
  const initMapCenter = {
    mapY: 37.7278127,
    mapX: 127.5112565,
  };

  // 초기 맵 생성
  useEffect(() => {
    if (!mapLoaded) return;

    const container = document.getElementById("map");
    const newMap = initializeMap(container, initMapCenter);
    setMap(newMap);

    // 초기 마커 생성
    const markerPosition = new window.kakao.maps.LatLng(
      initMapCenter.mapY,
      initMapCenter.mapX
    );
    const marker = createMarker(markerPosition, newMap);
    setupMarkerEvents(marker, newMap, initMapCenter, nav);
  }, [mapLoaded, nav]);

  // displayData 변경시 지도 업데이트
  useEffect(() => {
    if (!map || !displayData || displayData.length === 0) return;

    const firstLocation = displayData[0];
    const newCenter = moveMapCenter(map, firstLocation);

    // 새 마커 생성
    const marker = createMarker(newCenter, map);
    setupMarkerEvents(marker, map, firstLocation, nav);
  }, [displayData, map, nav]);

  // selectedCamping 변경시 지도 업데이트
  useEffect(() => {
    if (!map || !selectedCamping) return;

    const newCenter = moveMapCenter(map, selectedCamping);

    // 새 마커 생성
    const marker = createMarker(newCenter, map);
    setupMarkerEvents(marker, map, selectedCamping, nav);
  }, [selectedCamping, map, nav]);

  return <div id="map"></div>;
};
const campingShape = PropTypes.shape({
  contentId: PropTypes.string.isRequired,
  facltNm: PropTypes.string.isRequired,
  lineIntro: PropTypes.string,
  intro: PropTypes.string,
  allar: PropTypes.string,
  mapX: PropTypes.string.isRequired,
  mapY: PropTypes.string.isRequired,
});

KakaoMap.propTypes = {
  displayData: PropTypes.arrayOf(campingShape),
  selectedCamping: campingShape,
};
