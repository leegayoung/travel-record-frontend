// React의 FC(Functional Component) 타입을 사용하기 위해 임포트합니다.
import React from 'react';
// 지도 컴포넌트를 페이지에 포함시키기 위해 임포트합니다.
import KoreaMap from '../components/KoreaMap';
// 이 페이지의 전용 스타일을 담고 있는 CSS 모듈을 임포트합니다.
import styles from './PostListPage.module.css';

/**
 * @description 여행 기록을 보여주는 메인 페이지 컴포넌트입니다.
 * - CSS 모듈을 사용하여 반응형 및 중앙 정렬 레이아웃을 구현합니다.
 * - `KoreaMap` 컴포넌트를 사용하여 대한민국 지도를 표시합니다.
 * - 지도에서 특정 지역을 클릭하면 해당 지역의 게시글 작성 페이지로 이동하는 상호작용의 시작점 역할을 합니다.
 */
const PostListPage: React.FC = () => {
  return (
    // pageContainer: flexbox를 이용해 페이지 콘텐츠 전체를 화면 중앙에 배치합니다.
    <div className={styles.pageContainer}>
      {/* contentWrapper: 콘텐츠의 최대 너비를 제한하고 일관된 레이아웃을 제공합니다. */}
      <div className={styles.contentWrapper}>
        <header>
          <h1 className={styles.title}>어디로 떠나볼까요?</h1>
          <p className={styles.subtitle}>지도에서 기록하고 싶은 지역을 선택하세요.</p>
        </header>

        <main>
          {/*
            KoreaMap 컴포넌트가 지도를 렌더링합니다.
            지도 내부의 모든 로직(호버, 클릭, 내비게이션)은 KoreaMap 컴포넌트가 독립적으로 처리하므로,
            PostListPage는 이 컴포넌트를 렌더링하기만 하면 됩니다.
          */}
          <KoreaMap />
        </main>

        {/*
          향후 확장 기능 구현을 위한 주석 처리된 섹션입니다.
          예: 선택된 지역의 게시글 목록을 이 공간에 표시할 수 있습니다.
          <section className="mt-8">
            // 게시글 목록이 여기에 표시됩니다.
          </section>
        */}
      </div>
    </div>
  );
};

export default PostListPage;