// src/components/PostCard.tsx

import React from 'react';
import type { Post } from '../types/post'; // 게시물 타입 임포트
 // 게시물 타입 임포트

/**
 * @interface PostCardProps
 * @description PostCard 컴포넌트가 받을 props의 타입을 정의합니다.
 */
interface PostCardProps {
  post: Post; // 렌더링할 게시물 데이터 객체
}

/**
 * @function PostCard
 * @description 단일 게시물을 카드 형태로 표시하는 UI 컴포넌트입니다.
 * @param {PostCardProps} { post } - 표시할 게시물 데이터
 * @returns {React.ReactElement} - 게시물 카드 UI
 */
const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // ISO 형식의 날짜 문자열을 읽기 쉬운 형태로 변환하는 유틸리티 함수 (간단하게 구현)
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  return (
    // Tailwind CSS를 사용하여 카드 스타일을 정의합니다.
    // max-w-sm: 최대 너비 설정
    // rounded-lg: 모서리 둥글게
    // overflow-hidden: 내용이 카드 밖으로 넘어가지 않도록 숨김
    // shadow-lg: 큰 그림자 효과
    // bg-white: 배경색 흰색
    // transition-transform, hover:scale-105: 마우스 오버 시 확대 애니메이션
    // duration-300: 애니메이션 지속 시간
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform duration-300 hover:scale-105 cursor-pointer">
      {/* 게시물 대표 이미지 */}
      {post.imageUrl && (
        <img className="w-full h-48 object-cover" src={post.imageUrl} alt={post.title} />
      )}
      <div className="px-6 py-4">
        {/* 게시물 제목 */}
        <div className="font-bold text-xl mb-2 text-gray-800">{post.title}</div>
        {/* 게시물 내용 */}
        <p className="text-gray-700 text-base mb-4 line-clamp-3">
          {post.content}
        </p>
        {/* 지역 정보 */}
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">지역:</span> {post.regionName || post.regionCode}
        </p>
        {/* 작성자 정보 */}
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">작성자:</span> {post.authorName}
        </p>
        {/* 게시물 유형 */}
        <p className="text-gray-600 text-sm mb-2">
          <span className="font-semibold">유형:</span> {post.type === 'personal' ? '개인' : '그룹'}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 border-t border-gray-200">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          작성일: {formatDate(post.createdAt)}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
          수정일: {formatDate(post.updatedAt)}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
