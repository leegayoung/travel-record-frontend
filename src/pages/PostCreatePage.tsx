import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PostForm from '../components/PostForm'; // 게시물 폼 컴포넌트 임포트
import { createPost } from '../api/postApi'; // 게시물 생성 API 함수 임포트
import type { CreatePostPayload } from '../types/post'; // 게시물 타입 임포트

/**
 * @description 새로운 게시물을 작성하는 페이지 컴포넌트입니다.
 * URL 쿼리 파라미터로부터 선택된 지역을 받아, 해당 지역에 대한 게시물을 작성합니다.
 */
const PostCreatePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // URL에서 'region' 쿼리 파라미터를 읽어옵니다.
  const selectedRegion = searchParams.get('region');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 페이지 로드 시 지역 파라미터가 없으면 경고 후 이전 페이지로 이동시킵니다.
    if (!selectedRegion) {
      alert('지도에서 먼저 지역을 선택해주세요.');
      navigate(-1); // 이전 페이지로 돌아가기
    }
  }, [selectedRegion, navigate]);

  /**
   * @function handleCreatePost
   * @description PostForm에서 폼 제출 시 호출되는 함수입니다.
   * 입력된 게시물 데이터와 URL에서 받은 지역 정보를 합쳐 서버에 게시물 생성 요청을 보냅니다.
   * @param formData - 폼에서 입력된 게시물 데이터 (regionCode 제외)
   */
  const handleCreatePost = async (formData: Omit<CreatePostPayload, 'regionCode'>) => {
    if (!selectedRegion) {
      setError('지역 정보가 없습니다. 지도 페이지로 돌아가 다시 시도해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const postData: CreatePostPayload = {
        ...formData,
        regionCode: selectedRegion, // URL 파라미터에서 받은 지역명을 regionCode로 사용
      };
      await createPost(postData);
      alert('게시물이 성공적으로 작성되었습니다!');
      navigate('/posts'); // 게시물 목록 페이지로 이동
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('게시물 작성에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 지역 정보가 없는 경우 렌더링을 막습니다.
  if (!selectedRegion) {
    return (
      <div className="text-center p-8">
        <p className="text-lg text-gray-600">지역 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          <span className="text-blue-600">{selectedRegion}</span> 여행 기록하기
        </h2>
        <p className="text-center text-gray-500 mb-8">
          이곳에서의 경험을 공유해주세요.
        </p>

        {/* PostForm 컴포넌트: 게시물 제목, 내용, 유형 입력 폼 */}
        <PostForm
          onSubmit={handleCreatePost}
          buttonText="게시물 등록"
          isLoading={loading}
        />
        {error && (
          <p className="text-red-500 text-sm italic mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default PostCreatePage;