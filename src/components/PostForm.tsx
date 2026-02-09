// src/components/PostForm.tsx

import React, { useState, useEffect } from 'react';
import type { CreatePostPayload, Post } from '../types/post'; // 게시물 관련 타입 임포트
 // 게시물 관련 타입 임포트

/**
 * @interface PostFormProps
 * @description PostForm 컴포넌트가 받을 props의 타입을 정의합니다.
 */
interface PostFormProps {
  // 폼 제출 시 호출될 콜백 함수.
  // regionCode는 PostCreatePage에서 주입하므로 여기서는 title, content, type만 받습니다.
  onSubmit: (data: Omit<CreatePostPayload, 'regionCode'>) => void;
  initialPost?: Post; // 수정 모드일 경우, 초기 게시물 데이터를 받습니다.
  buttonText?: string; // 제출 버튼 텍스트 (기본값: '게시물 작성')
  isLoading?: boolean; // 폼 제출 중 로딩 상태
}

/**
 * @function PostForm
 * @description 게시물(여행 기록)의 제목, 내용, 유형을 입력받는 폼 컴포넌트입니다.
 * @param {PostFormProps} props - onSubmit, initialPost, buttonText, isLoading 등의 props
 * @returns {React.ReactElement} - 게시물 작성/수정 폼 UI
 */
const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialPost, buttonText = '게시물 작성', isLoading = false }) => {
  // 폼 입력 필드의 상태를 관리합니다.
  const [title, setTitle] = useState<string>(initialPost?.title || '');
  const [content, setContent] = useState<string>(initialPost?.content || '');
  const [type, setType] = useState<'personal' | 'group'>(initialPost?.type || 'personal');

  // initialPost prop이 변경될 때 폼 필드를 업데이트합니다. (주로 수정 모드에서 사용)
  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setContent(initialPost.content);
      setType(initialPost.type);
    }
  }, [initialPost]);

  /**
   * @function handleSubmit
   * @description 폼 제출 시 실행되는 함수입니다.
   * @param {React.FormEvent} e - 폼 이벤트 객체
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침)을 방지합니다.
    onSubmit({ title, content, type }); // 부모 컴포넌트로 현재 폼 데이터 전달
  };

  return (
    // Tailwind CSS를 사용하여 폼 스타일을 정의합니다.
    // space-y-4: 자식 요소들 사이에 1rem(16px)의 세로 간격을 둡니다.
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          제목
        </label>
        <input
          type="text"
          id="title"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required // 필수 입력 필드
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          내용
        </label>
        <textarea
          id="content"
          rows={5} // 텍스트 영역의 기본 높이 설정
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required // 필수 입력 필드
        ></textarea>
      </div>

      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          게시물 유형
        </label>
        <select
          id="type"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          value={type}
          onChange={(e) => setType(e.target.value as 'personal' | 'group')} // 타입 캐스팅
        >
          <option value="personal">개인</option>
          <option value="group">그룹</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={isLoading} // 로딩 중일 때는 버튼 비활성화
      >
        {isLoading ? '처리 중...' : buttonText}
      </button>
    </form>
  );
};

export default PostForm;
