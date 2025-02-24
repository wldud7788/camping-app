# 캠핑 애플리케이션

캠핑 API를 활용한 캠핑장 조회 kakaoMap API를 활용한 위치 확인 가능
및 소셜 로그인을 활용한 카카오, 구글 로그인 가능
supabse realtime을 활용한 실시간 채팅을 제공하는 웹 애플리케이션입니다.

## 📅 프로젝트 기간

2025.01.28 - 2025.02.24

## 🔗 배포 URL

[캠핑 애플리케이션 바로가기](https://camping-app-vert.vercel.app/)

## 📝 기술 문서

- [로그인 구현](https://velog.io/@rooftop7788/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%8B%9C%EC%9E%91-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84)
- [미들웨어 구현](https://velog.io/@rooftop7788/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EA%B5%AC%ED%98%84)
- [마이페이지](https://velog.io/@rooftop7788/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80)
- [무한 스크롤](https://velog.io/@rooftop7788/React%EB%A1%9C-%EC%BA%A0%ED%95%91-%EC%9B%B9-%EB%A7%8C%EB%93%A4%EA%B8%B04-%EC%99%B8%EB%B6%80-API%ED%99%9C%EC%9A%A9)
- [검색 기능 구현](https://velog.io/@rooftop7788/%EA%B2%80%EC%83%89-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84)
- [카카오맵 활용](https://velog.io/@rooftop7788/React%EB%A1%9C-%EC%BA%A0%ED%95%91-%EC%9B%B9-%EB%A7%8C%EB%93%A4%EA%B8%B06-kakao-map-%ED%99%9C%EC%9A%A9)
- [채팅 적용](https://velog.io/@rooftop7788/React%EB%A1%9C-%EC%BA%A0%ED%95%91-%EC%9B%B9-%EB%A7%8C%EB%93%A4%EA%B8%B0-6-%EC%B1%84%ED%8C%85-realtime)

## 💡 주요 기능

### 메인 페이지

- 캠핑 API를 활용한 캠핑장 정보 및 위치 제공
  <div>
  <img src="https://velog.velcdn.com/images/rooftop7788/post/b2ed3e76-98cb-4736-baf4-53d6a1b907f0/image.png" width="600" />
  </div>

### 캠핑핑 상세 페이지

- 캠핑장 상세 정보 확인
- 댓글 작성, 수정, 삭제 기능
  <div>
  <img src="https://velog.velcdn.com/images/rooftop7788/post/6e01b383-7c80-4582-9592-7e4407427d59/image.png" width="600" />
  </div>

### 캠핑장 검색

- Kakao Map api를 활용한 캠핑장 위치 정보 확인
- 캠핑 카드 클릭 시 해당 위치로 마커 이동
- 마커 클릭 시 캠핑장 디테일 페이지로 이동
- 디바운스 처리하여 불필요한 API호출 방지
- URL 쿼리 파라미터 관리 (검색어를 URL에 반영하여 사용자가 새로고침해도 검색 결과 유지)
  <div>
  <img src="https://velog.velcdn.com/images/rooftop7788/post/313c06f8-46f8-4d60-955b-251be9dbfc2f/image.gif" width="600" />
  </div>

### 채팅

- supabase realtime을 활용한 채팅 구현
- 모든 사용자가 생성된 채팅방을 확인
- 권한이 있는 사용자만 채팅방에 참가
- 생성한 본인은 자동으로 채팅방에 대한 권한 부여
- 로그인된 사용자가 채팅방에 참가 신청 시, 채팅방에 대한 권한 부여
- 실시간 채팅 가능
<div>
<img src="https://velog.velcdn.com/images/rooftop7788/post/7fd093d3-598c-4dd7-9290-c21711a5e513/image.gif" width="600"/>
</div>

### 사용자 인증

- 이메일 로그인
- 소셜 로그인 연동(구글, 카카오)
- 유효성 검사
<div style="display: flex; gap: 10px;">
<img src="https://velog.velcdn.com/images/rooftop7788/post/5486a0a1-0d5c-40c4-addf-c8354f55c884/image.png" width="400" />
<img src="https://velog.velcdn.com/images/rooftop7788/post/28fc2089-69ac-4774-882a-81cfc60794e5/image.gif" width="400"/>
</div>

### 마이 페이지

- 프로필 이미지 수정
- 닉네임 수정
  <div>
  <img src="https://velog.velcdn.com/images/rooftop7788/post/eab93fa9-a164-4b78-b785-8b73bdc607af/image.png" width="600" />
  </div>

## 🛠 기술 스택

### Frontend

- **Framework & Language**

  - React

- **Styling**

  - Css

- **상태 관리 & 데이터 페칭**
  - React Context API
  - Custom Hooks
  - TanStack Query (React Query)
    - useQuery
    - useMutation
    - Optimistic Updates

### Backend as a Service

- **Supabase**
  - Authentication
  - Database
  - Real-time Subscriptions
  - Storage

### External API

- 고캠핑 API (캠핑 데이터 제공)

### DevOps

- Vercel (배포)
