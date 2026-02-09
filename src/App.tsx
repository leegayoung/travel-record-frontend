// src/App.tsx

import React from 'react';
import AppRouter from './router/Router'; // 정의한 라우터 컴포넌트를 임포트합니다.

/**
 * @function App
 * @description 애플리케이션의 최상위 루트 컴포넌트입니다.
 * 이 컴포넌트 내부에서 모든 라우팅과 페이지가 렌더링됩니다.
 */
function App() {
  return (
    // Tailwind CSS를 사용하여 전체 애플리케이션의 컨테이너를 정의합니다.
    // min-h-screen: 최소 화면 높이를 채웁니다.
    // bg-gray-100: 배경색을 흰색으로 설정합니다.
    // flex, justify-center, items-center: 내용을 중앙에 배치합니다.
    // p-4: 패딩을 줍니다.
    // bg-white: 배경색 흰색
    // rounded-lg: 모서리 둥글게
    // shadow-md: 그림자 효과
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      {/* AppRouter 컴포넌트를 렌더링하여 페이지 라우팅을 담당하게 합니다. */}
      {/* 모든 페이지는 AppRouter 내부에서 관리됩니다. */}
      <AppRouter />
    </div>
  );
}

export default App;