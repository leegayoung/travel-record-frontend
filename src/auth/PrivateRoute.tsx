// src/auth/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../api/axios'; // JWT 토큰 확인 함수 임포트

/**
 * @interface PrivateRouteProps
 * @description PrivateRoute 컴포넌트가 받을 props의 타입을 정의합니다.
 */
interface PrivateRouteProps {
  children: React.ReactNode; // 보호된 경로에서 렌더링될 컴포넌트
}

/**
 * @function PrivateRoute
 * @description 인증된 사용자만 접근할 수 있는 경로를 설정하는 컴포넌트입니다.
 * 사용자의 JWT 토큰 존재 여부를 확인하여, 없으면 로그인 페이지로 리다이렉션합니다.
 * @param {PrivateRouteProps} { children } - 보호된 경로에서 렌더링할 자식 컴포넌트
 * @returns {React.ReactElement} - 자식 컴포넌트 또는 로그인 페이지로의 리다이렉션
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // getAuthToken 함수를 통해 localStorage에 JWT 토큰이 있는지 확인합니다.
  const isAuthenticated = !!getAuthToken(); // 토큰이 있으면 true, 없으면 false

  // 토큰이 없으면 (로그인되지 않았다면) /login 경로로 강제로 이동(리다이렉션)시킵니다.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있다면 (로그인되어 있다면) 요청된 자식 컴포넌트를 렌더링합니다.
  return children;
};

export default PrivateRoute;
