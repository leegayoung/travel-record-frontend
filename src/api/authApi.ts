// src/api/authApi.ts

import { api, setAuthToken, removeAuthToken } from './axios';

/**
 * @interface LoginPayload
 * @description 로그인 요청 시 백엔드로 전송할 데이터의 타입을 정의합니다.
 */
interface LoginPayload {
  email: string; // 사용자 이메일
  password: string; // 사용자 비밀번호
}

/**
 * @interface LoginResponse
 * @description 로그인 성공 시 백엔드로부터 받을 응답 데이터의 타입을 정의합니다.
 * 실제 백엔드 응답에 따라 필드를 조절해야 합니다.
 */
interface LoginResponse {
  token: string; // JWT (JSON Web Token)
  // 기타 사용자 정보 (예: username, role 등)
}

/**
 * @function login
 * @description 사용자 로그인 API를 호출하고, 성공 시 토큰을 저장합니다.
 * @param {LoginPayload} credentials - 사용자 로그인 정보 (아이디, 비밀번호)
 * @returns {Promise<LoginResponse>} - 로그인 성공 시 토큰과 기타 사용자 정보
 * @throws {Error} - 로그인 실패 시 에러 발생
 */
export const login = async (credentials: LoginPayload): Promise<LoginResponse> => {
  try {
    // '/auth/login'은 실제 백엔드의 로그인 API 엔드포인트로 변경해야 합니다.
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    const { token } = response.data; // 응답에서 토큰 추출

    // 로그인 성공 시 받은 토큰을 localStorage에 저장합니다.
    // 이 토큰은 이후 모든 인증이 필요한 요청에 자동으로 포함됩니다.
    setAuthToken(token);

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    // 에러를 다시 throw하여 호출하는 컴포넌트에서 에러를 처리할 수 있도록 합니다.
    throw error;
  }
};

/**
 * @interface RegisterPayload
 * @description 회원가입 요청 시 백엔드로 전송할 데이터의 타입을 정의합니다.
 */
interface RegisterPayload {
  email: string; // 사용자 이메일
  password: string; // 사용자 비밀번호
}

/**
 * @interface RegisterResponse
 * @description 회원가입 성공 시 백엔드로부터 받을 응답 데이터의 타입을 정의합니다.
 * 실제 백엔드 응답에 따라 필드를 조절해야 합니다.
 */
interface RegisterResponse {
  message: string; // 회원가입 성공 메시지
  // 기타 사용자 정보 (예: userId 등)
}

/**
 * @function register
 * @description 사용자 회원가입 API를 호출합니다.
 * @param {RegisterPayload} userData - 사용자 회원가입 정보 (아이디, 비밀번호)
 * @returns {Promise<RegisterResponse>} - 회원가입 성공 시 메시지
 * @throws {Error} - 회원가입 실패 시 에러 발생
 */
export const register = async (userData: RegisterPayload): Promise<RegisterResponse> => {
  try {
    // '/auth/register'는 실제 백엔드의 회원가입 API 엔드포인트로 변경해야 합니다.
    const response = await api.post<RegisterResponse>('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

/**
 * @function logout
 * @description 사용자 로그아웃 처리를 수행합니다.
 * localStorage에서 토큰을 제거하여 더 이상 인증된 요청을 보낼 수 없게 합니다.
 */
export const logout = (): void => {
  removeAuthToken(); // 토큰 제거
  // 로그아웃 후에는 보통 로그인 페이지로 리다이렉션됩니다.
  // 이 부분은 컴포넌트나 라우터에서 처리하는 것이 일반적입니다.
  console.log('User logged out.');
};
