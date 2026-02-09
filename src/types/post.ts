// src/types/post.ts

/**
 * @interface Post
 * @description 게시물(여행 기록) 데이터의 타입을 정의합니다.
 * 백엔드에서 받아오거나 프론트엔드에서 생성할 게시물의 데이터 구조를 명확히 합니다.
 */
export interface Post {
  id: string; // 게시물 고유 ID
  title: string; // 게시물 제목
  content: string; // 게시물 내용
  imageUrl: string; // 대표 이미지 URL (서버에서 regionCode 기반으로 자동 생성)
  regionCode: string; // 게시물이 속한 지역 코드 (예: "SEOUL-GANGNAM")
  regionName: string; // 게시물이 속한 지역 이름 (예: "서울특별시 강남구")
  authorId: string; // 작성자 ID
  authorName: string; // 작성자 이름
  type: 'personal' | 'group'; // 개인 게시물 또는 그룹 게시물
  createdAt: string; // 게시물 생성 일시 (ISO 8601 형식 문자열)
  updatedAt: string; // 게시물 최종 수정 일시 (ISO 8601 형식 문자열)
}

/**
 * @interface CreatePostPayload
 * @description 게시물 생성 시 백엔드로 전송할 데이터의 타입을 정의합니다.
 * 클라이언트에서 사용자 입력을 통해 백엔드에 보낼 데이터 필드를 명시합니다.
 */
export interface CreatePostPayload {
  title: string;
  content: string;
  regionCode: string;
  type: 'personal' | 'group';
  // 대표 이미지는 서버에서 regionCode에 따라 자동 매핑되므로 클라이언트에서 보낼 필요 없음
}

/**
 * @interface UpdatePostPayload
 * @description 게시물 수정 시 백엔드로 전송할 데이터의 타입을 정의합니다.
 */
export interface UpdatePostPayload {
  title?: string;
  content?: string;
  type?: 'personal' | 'group';
}
