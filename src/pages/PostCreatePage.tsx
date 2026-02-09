// src/pages/PostCreatePage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegionSelector from '../components/RegionSelector'; // 지역 선택 컴포넌트 임포트
import PostForm from '../components/PostForm'; // 게시물 폼 컴포넌트 임포트
import { createPost } from '../api/postApi'; // 게시물 생성 API 함수 임포트
import type { CreatePostPayload } from '../types/post'; // 게시물 타입 임포트
 // 게시물 타입 임포트

/**
 * @function PostCreatePage
 * @description 새로운 게시물을 작성하는 페이지 컴포넌트입니다.
 * 지역 선택 및 게시물 내용 입력을 통해 게시물을 생성하고 서버에 전송합니다.
 */
const PostCreatePage: React.FC = () => {
  const [selectedRegionCode, setSelectedRegionCode] = useState<string>(''); // 선택된 지역 코드 상태
  const [selectedRegionName, setSelectedRegionName] = useState<string>(''); // 선택된 지역 이름 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  /**
   * @function handleSelectRegion
   * @description RegionSelector 컴포넌트에서 지역이 선택될 때 호출되는 콜백 함수입니다.
   * @param {string} code - 선택된 지역의 고유 코드
   * @param {string} name - 선택된 지역의 이름
   */
  const handleSelectRegion = (code: string, name: string) => {
    setSelectedRegionCode(code);
    setSelectedRegionName(name);
    // 지역 선택 시 이전 에러 메시지 초기화
    if (error && error.includes('지역을 선택')) {
      setError(null);
    }
  };

  /**
   * @function handleCreatePost
   * @description PostForm에서 폼 제출 시 호출되는 함수입니다.
   * 입력된 게시물 데이터와 선택된 지역 코드를 합쳐 서버에 게시물 생성 요청을 보냅니다.
   * @param {Omit<CreatePostPayload, 'regionCode'>} formData - 폼에서 입력된 게시물 데이터 (regionCode 제외)
   */
  const handleCreatePost = async (formData: Omit<CreatePostPayload, 'regionCode'>) => {
    // 지역이 선택되지 않았다면 에러 메시지 표시
    if (!selectedRegionCode) {
      setError('게시물을 작성하려면 지역을 선택해야 합니다.');
      return;
    }

    setLoading(true); // 로딩 시작
    setError(null); // 이전 에러 메시지 초기화

    try {
      // CreatePostPayload 타입에 맞게 데이터 조합
      const postData: CreatePostPayload = {
        ...formData,
        regionCode: selectedRegionCode,
      };
      await createPost(postData); // 게시물 생성 API 호출
      alert('게시물이 성공적으로 작성되었습니다!');
      navigate('/posts'); // 게시물 목록 페이지로 이동
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('게시물 작성에 실패했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    // Tailwind CSS를 사용하여 페이지 컨테이너 스타일링
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">새 게시물 작성</h2>

      {/* RegionSelector 컴포넌트: 지역 선택 UI */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          여행 지역 선택
        </label>
        <RegionSelector onSelectRegion={handleSelectRegion} />
        {selectedRegionCode && (
          <p className="mt-2 text-sm text-gray-600">
            현재 선택된 지역: <span className="font-semibold">{selectedRegionName} ({selectedRegionCode})</span>
          </p>
        )}
        {error && error.includes('지역을 선택') && (
          <p className="text-red-500 text-xs italic mt-2">{error}</p>
        )}
      </div>

      {/* PostForm 컴포넌트: 게시물 제목, 내용, 유형 입력 폼 */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          게시물 내용
        </label>
        <PostForm onSubmit={handleCreatePost} buttonText="게시물 등록" isLoading={loading} />
        {error && !error.includes('지역을 선택') && (
          <p className="text-red-500 text-xs italic mt-2">{error}</p>
        )}
      </div>

    </div>
  );
};

export default PostCreatePage;
