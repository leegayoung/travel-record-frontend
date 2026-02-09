// src/api/axios.ts

import axios from 'axios';

/**
 * @constant API_BASE_URL
 * @description 백엔드 API의 기본 URL을 정의합니다.
 * 개발 환경에서는 로컬 서버 주소를, 배포 환경에서는 실제 서비스 주소를 사용합니다.
 * .env 파일을 사용하여 환경 변수로 관리하는 것이 일반적이지만, 여기서는 편의상 하드코딩합니다.
 * 백엔드 개발자님은 이 주소를 실제 백엔드 API의 주소로 변경해야 합니다.
 */
const API_BASE_URL = '/api'; // 실제 백엔드 API 주소로 변경해주세요.

/**
 * @function getAuthToken
 * @description localStorage에서 인증 토큰(JWT)을 가져오는 함수입니다.
 * 토큰이 존재하면 문자열로 반환하고, 없으면 null을 반환합니다.
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('jwt_token');
};

/**
 * @function setAuthToken
 * @description localStorage에 인증 토큰(JWT)을 저장하는 함수입니다.
 * 로그인 성공 시 서버로부터 받은 토큰을 저장할 때 사용합니다.
 * @param token 저장할 JWT 문자열
 */
export const setAuthToken = (token: string): void => {
  localStorage.setItem('jwt_token', token);
};

/**
 * @function removeAuthToken
 * @description localStorage에서 인증 토큰(JWT)을 제거하는 함수입니다.
 * 로그아웃 시 또는 토큰이 만료/유효하지 않을 때 사용합니다.
 */
export const removeAuthToken = (): void => {
  localStorage.removeItem('jwt_token');
};

/**
 * @constant api
 * @description 애플리케이션에서 백엔드 API와 통신하기 위한 Axios 인스턴스입니다.
 * 모든 API 요청에 이 인스턴스를 사용하면 공통 설정(baseURL, 인터셉터 등)이 자동으로 적용됩니다.
 */
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // 기본적으로 JSON 형식으로 데이터를 주고받도록 설정
  },
});

/**
 * @description Request Interceptor 설정
 * 모든 요청이 백엔드로 전송되기 전에 실행되는 로직을 정의합니다.
 * 주로 인증 토큰을 헤더에 추가하는 데 사용됩니다.
 */
api.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰을 가져옵니다.
    const token = getAuthToken();
    // 토큰이 존재하면 Authorization 헤더에 추가합니다.
    // 백엔드에서는 이 헤더를 통해 사용자를 인증합니다.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 에러 발생 시 처리 (예: 네트워크 문제)
    return Promise.reject(error);
  }
);

/**
 * @description Response Interceptor 설정
 * 백엔드로부터 응답을 받은 후, 클라이언트로 전달되기 전에 실행되는 로직을 정의합니다.
 * 주로 에러 처리(예: 401 Unauthorized)에 사용됩니다.
 */
api.interceptors.response.use(
  (response) => {
    // 정상적인 응답일 경우 그대로 반환합니다.
    return response;
  },
  (error) => {
    // 응답 에러 발생 시 처리
    // 에러 응답이 있고, 상태 코드가 401(Unauthorized)인 경우
    if (error.response && error.response.status === 401) {
      console.error('401 Unauthorized: Access token is invalid or expired.');
      // 1. localStorage에서 유효하지 않은 토큰을 제거합니다.
      removeAuthToken();
      // 2. 사용자에게 로그아웃되었음을 알리거나,
      // 3. 로그인 페이지로 강제 이동시켜 재인증을 유도합니다.
      // 실제 애플리케이션에서는 react-router-dom의 useNavigate 훅을 사용할 수 없으므로,
      // window.location.href를 사용하거나, 전역 상태 관리 라이브러리를 통해 리다이렉션을 처리해야 합니다.
      // 여기서는 가장 간단한 방법인 window.location.href를 사용합니다.
      // 백엔드 개발자님은 이 로직을 실제 프론트엔드 라우팅 시스템에 맞게 수정해야 합니다.
      window.alert('세션이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.');
      window.location.href = '/login'; // 로그인 페이지 경로로 변경해주세요.
    }
    // 다른 모든 에러는 그대로 Promise.reject로 반환하여 컴포넌트에서 처리할 수 있도록 합니다.
    return Promise.reject(error);
  }
);
