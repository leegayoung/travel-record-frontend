// src/router/Router.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';

// 라우팅될 페이지 컴포넌트들을 미리 임포트합니다.
// 실제 파일은 src/pages 디렉토리에 생성될 예정입니다.
import LoginPage from '../pages/LoginPage';
import PostCreatePage from '../pages/PostCreatePage';
import PostListPage from '../pages/PostListPage';
import RegisterPage from '../pages/RegisterPage'; // RegisterPage 임포트
import PrivateRoute from '../auth/PrivateRoute'; // PrivateRoute를 별도 파일에서 임포트합니다.


/**
 * @function AppRouter
 * @description 애플리케이션의 모든 라우팅 규칙을 정의하는 메인 라우터 컴포넌트입니다.
 * @returns {React.ReactElement} - 라우팅 설정이 적용된 컴포넌트
 */
const AppRouter: React.FC = () => {
  return (
    // BrowserRouter는 HTML5 History API를 사용하여 UI와 URL을 동기화합니다.
    <BrowserRouter>
      {/* Routes 컴포넌트는 하위의 Route들을 검색하여 현재 URL과 일치하는 첫 번째 Route를 렌더링합니다. */}
      <Routes>
        <Route element={<App />}>
          {/*
           Public Routes (인증 없이 접근 가능한 경로)
           - /login: 로그인 페이지
           - /register: 회원가입 페이지
         */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/*
           Private Routes (인증 후에만 접근 가능한 경로)
           PrivateRoute 컴포넌트 내부에 렌더링될 컴포넌트를 자식으로 전달합니다.
           PrivateRoute는 내부적으로 인증 여부를 확인하여 페이지 접근을 제어합니다.
         */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PostListPage /> {/* 기본 경로('/')는 게시물 목록 페이지로 설정 */}
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <PostListPage /> {/* /posts 경로도 게시물 목록 페이지로 설정 */}
              </PrivateRoute>
            }
          />
          <Route
            path="/posts/create"
            element={
              <PrivateRoute>
                <PostCreatePage /> {/* /posts/create: 새 게시물 작성 페이지 */}
              </PrivateRoute>
            }
          />
          {/*
           TODO: 필요한 경우 게시물 상세 페이지, 수정 페이지 등의 라우트 추가
           <Route path="/posts/:id" element={<PrivateRoute><PostDetailPage /></PrivateRoute>} />
           <Route path="/posts/edit/:id" element={<PrivateRoute><PostEditPage /></PrivateRoute>} />
         */}

          {/*
           Fallback Route (일치하는 경로가 없을 경우)
           모든 경로에 일치하지 않으면 홈('/posts')으로 리다이렉션합니다.
           실제 서비스에서는 404 Not Found 페이지를 렌더링할 수도 있습니다.
         */}
          <Route path="*" element={<Navigate to="/posts" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
