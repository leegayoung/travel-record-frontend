// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router/Router'; // 라우터 설정을 임포트합니다.

// index.html 파일에 있는 'root' ID를 가진 DOM 요소를 찾아 React 애플리케이션의 진입점으로 설정합니다.
// '!'는 해당 요소가 null이 아님을 TypeScript에 알립니다.
ReactDOM.createRoot(document.getElementById('root')!).render(
  // React.StrictMode는 애플리케이션 내의 잠재적인 문제를 감지하기 위한 도구입니다.
  // 개발 모드에서만 작동하며, 프로덕션 빌드에는 영향을 주지 않습니다.
  <React.StrictMode>
    {/* AppRouter 컴포넌트가 전체 애플리케이션의 시작점입니다. */}
    <AppRouter />
  </React.StrictMode>
);