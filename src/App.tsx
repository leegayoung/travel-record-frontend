import { Outlet } from 'react-router-dom';
import './App.css';
console.log("컴포넌트 진입 성공!");
/**
 * @description 애플리케이션의 메인 레이아웃을 정의하는 최상위 컴포넌트입니다.
 * 모든 페이지 콘텐츠(`Outlet`)를 감싸는 일관된 구조와 스타일을 제공합니다.
 * - 다크 모드 배경색을 설정합니다.
 * - 콘텐츠를 수평 중앙에 배치하고 반응형 최대 너비를 설정합니다.
 * - 전체 애플리케이션에 대한 기본 폰트 및 텍스트 색상을 지정합니다.
 */
function App() {
  console.log("컴포넌트 진입 성공!11");
  return (
    // 전체 화면을 차지하며, 다크 모드에서는 어두운 회색 배경을 가집니다.
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {/* 
        메인 콘텐츠 컨테이너입니다.
        - `w-full`: 너비를 100%로 설정합니다.
        - `flex-grow`: 사용 가능한 공간을 모두 채우도록 합니다.
        - `flex`, `flex-col`, `items-center`: 자식 요소(Outlet)를 수직으로 정렬하고 수평 중앙에 배치합니다.
      */}
      <div className="w-full flex-grow flex flex-col items-center">
        {/*
          React Router의 Outlet 컴포넌트는 현재 경로에 맞는 페이지 컴포넌트를 렌더링합니다.
          이 Outlet을 감싸서 모든 페이지에 일관된 레이아웃(너비, 패딩 등)을 적용합니다.
        */}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
