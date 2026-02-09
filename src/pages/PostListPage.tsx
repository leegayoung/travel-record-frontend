// src/pages/PostListPage.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import RegionSelector from '../components/RegionSelector'; // 지역 선택 컴포넌트 임포트
import PostCard from '../components/PostCard'; // 게시물 카드 컴포넌트 임포트
import { getPostsByRegion } from '../api/postApi'; // 지역별 게시물 조회 API 함수 임포트
import { logout } from '../api/authApi'; // 로그아웃 API 함수 임포트
import type { Post } from '../types/post'; // 게시물 타입 임포트
import KoreaMap from "../components/KoreaMap";
 // 게시물 타입 임포트

/**
 * @function PostListPage
 * @description 게시물 목록을 표시하고 지역별로 필터링할 수 있는 페이지 컴포넌트입니다.
 */
const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태
  const [selectedRegionCode, setSelectedRegionCode] = useState<string>(''); // 선택된 지역 코드 상태
  const [selectedRegionName, setSelectedRegionName] = useState<string>(''); // 선택된 지역 이름 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  /**
   * @function fetchPosts
   * @description 선택된 지역에 해당하는 게시물을 서버로부터 불러오는 함수입니다.
   * useCallback 훅을 사용하여 selectedRegionCode가 변경될 때만 함수가 다시 생성되도록 최적화합니다.
   */
  const fetchPosts = useCallback(async () => {
    if (!selectedRegionCode) {
      setPosts([]); // 지역이 선택되지 않았으면 게시물 목록을 비웁니다.
      return;
    }

    setLoading(true); // 로딩 시작
    setError(null); // 이전 에러 메시지 초기화

    try {
      const data = await getPostsByRegion(selectedRegionCode); // API 호출
      setPosts(data); // 불러온 게시물로 상태 업데이트
    } catch (err) {
      console.error(`Failed to fetch posts for region ${selectedRegionCode}:`, err);
      setError('게시물을 불러오는 데 실패했습니다.');
      setPosts([]); // 에러 발생 시 게시물 목록 초기화
    } finally {
      setLoading(false); // 로딩 종료
    }
  }, [selectedRegionCode]); // selectedRegionCode가 변경될 때마다 fetchPosts 함수도 변경됩니다.

  // selectedRegionCode가 변경될 때마다 fetchPosts 함수를 실행하여 게시물을 업데이트합니다.
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // fetchPosts 함수가 변경될 때마다 (즉, selectedRegionCode 변경 시) 실행됩니다.

  /**
   * @function handleSelectRegion
   * @description RegionSelector 컴포넌트에서 지역이 선택될 때 호출되는 콜백 함수입니다.
   * @param {string} code - 선택된 지역의 고유 코드
   * @param {string} name - 선택된 지역의 이름
   */
  const handleSelectRegion = (code: string, name: string) => {
    setSelectedRegionCode(code);
    setSelectedRegionName(name);
  };

  /**
   * @function handleCreatePostClick
   * @description '새 게시물 작성' 버튼 클릭 시 게시물 작성 페이지로 이동합니다.
   */
  const handleCreatePostClick = () => {
    navigate('/posts/create');
  };

  /**
   * @function handleLogout
   * @description 로그아웃 버튼 클릭 시 로그아웃 처리를 수행합니다.
   */
  const handleLogout = () => {
    logout(); // 로그아웃 API 호출 (여기서는 단순히 localStorage에서 토큰 제거)
    navigate('/login'); // 로그인 페이지로 이동
  };
  
  const handleRegionClick = (region: string) => {
    console.log("클릭한 지역:", region);
  };

  return (
    
    // Tailwind CSS를 사용하여 페이지 컨테이너 스타일링
    // max-w-7xl: 최대 너비 설정 (큰 화면에서도 보기 좋게)
    // mx-auto: 가로 중앙 정렬
    // p-4: 패딩
    // bg-white: 배경 흰색
    // rounded-lg: 모서리 둥글게
    // shadow-md: 그림자 효과
    <div className="max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 text-center">
        대한민국 여행 기록
      </h1>

     <KoreaMap onRegionClick={handleRegionClick} />

      {/* 지역 선택 드롭다운 */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          게시물을 볼 지역을 선택하세요:
        </label>
        <RegionSelector onSelectRegion={handleSelectRegion} />
        {selectedRegionCode && (
          <p className="mt-2 text-sm text-gray-600">
            현재 선택된 지역: <span className="font-semibold">{selectedRegionName} ({selectedRegionCode})</span>
          </p>
        )}
      </div>

      {/* 게시물 관리 버튼 */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={handleCreatePostClick}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          새 게시물 작성
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          로그아웃
        </button>
      </div>

      {/* 로딩 및 에러 메시지 */}
      {loading && <p className="text-center text-blue-500 text-lg">게시물 불러오는 중...</p>}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {/* 게시물 목록 */}
      {!loading && !error && (
        posts.length > 0 ? (
          // grid, grid-cols-1 등 Tailwind CSS를 사용하여 반응형 그리드 레이아웃 구현
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              // PostCard 컴포넌트를 사용하여 각 게시물을 렌더링
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-xl mt-10">
            {selectedRegionCode ? `${selectedRegionName}에는 아직 게시물이 없습니다.` : '지역을 선택하여 게시물을 확인하세요.'}
          </p>
        )
      )}
    </div>
  );
};

export default PostListPage;
