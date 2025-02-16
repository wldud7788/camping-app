import axios from "axios";

export const CAMPING_API = {
  BASE_URL: "https://apis.data.go.kr/B551011/GoCamping",
  SERVICE_KEY: import.meta.env.VITE_CAMPING_API_KEY,
  MobileOS: "ETC",
  MobileApp: "AppTest",
  _type: "json",
  ROWS_PER_PAGE: 40, // 병렬 처리 시 1회 요청 당 불러올 행 수
  TOTAL_COUNT: 4109, // 전체 데이터 조회 시 사용할 행 수
};

export const campingAPi = {
  // 기본 API 호출 함수
  getBasedList: async (pageNo = 1, numOfRows = CAMPING_API.ROWS_PER_PAGE) => {
    try {
      const response = await axios.get(
        `${CAMPING_API.BASE_URL}/basedList?serviceKey=${CAMPING_API.SERVICE_KEY}&MobileOS=${CAMPING_API.MobileOS}&MobileApp=${CAMPING_API.MobileApp}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=${CAMPING_API._type}`
      );
      const data = response.data.response.body;
      return data;
    } catch (error) {
      console.log("API ERROR", error.message);
      throw error;
    }
  },

  searchList: async (
    keyword,
    pageNo = 1,
    numOfRows = CAMPING_API.TOTAL_COUNT
  ) => {
    try {
      const encodedKeyword = encodeURI(keyword);

      const response = await axios.get(
        `${CAMPING_API.BASE_URL}/searchList?serviceKey=${CAMPING_API.SERVICE_KEY}&MobileOS=${CAMPING_API.MobileOS}&MobileApp=${CAMPING_API.MobileApp}$keyword=${encodedKeyword}&pageNo=${pageNo}&numOfRows=${numOfRows}&_type=${CAMPING_API._type}`
      );
      const data = response.data.response.body;
      return data;
    } catch (error) {
      console.log("Search API ERROR ", error.message);
      throw error;
    }
  },
};
