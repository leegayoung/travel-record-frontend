// src/api/postApi.ts

import { api } from './axios';
import type { Post, CreatePostPayload, UpdatePostPayload } from '../types/post';

/**
 * @function createPost
 * @description 새로운 게시물을 생성하는 API를 호출합니다.
 * @param {CreatePostPayload} postData - 생성할 게시물 데이터 (제목, 내용, 지역 코드 등)
 * @returns {Promise<Post>} - 생성된 게시물 정보
 * @throws {Error} - 게시물 생성 실패 시 에러 발생
 */
export const createPost = async (postData: CreatePostPayload): Promise<Post> => {
  try {
    // '/posts'는 실제 백엔드의 게시물 생성 API 엔드포인트로 변경해야 합니다.
    const response = await api.post<Post>('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
};

/**
 * @function getPostsByRegion
 * @description 특정 지역 코드에 해당하는 게시물 목록을 조회하는 API를 호출합니다.
 * @param {string} regionCode - 조회할 지역의 코드 (예: "SEOUL-GANGNAM")
 * @returns {Promise<Post[]>} - 해당 지역의 게시물 목록
 * @throws {Error} - 게시물 목록 조회 실패 시 에러 발생
 */
export const getPostsByRegion = async (regionCode: string): Promise<Post[]> => {
  try {
    // `/posts/region/${regionCode}`는 실제 백엔드의 지역별 게시물 조회 API 엔드포인트로 변경해야 합니다.
    const response = await api.get<Post[]>(`/posts/region/${regionCode}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch posts for region ${regionCode}:`, error);
    throw error;
  }
};

/**
 * @function getPostById
 * @description 특정 ID를 가진 단일 게시물을 조회하는 API를 호출합니다.
 * @param {string} postId - 조회할 게시물의 ID
 * @returns {Promise<Post>} - 조회된 게시물 정보
 * @throws {Error} - 게시물 조회 실패 시 에러 발생
 */
export const getPostById = async (postId: string): Promise<Post> => {
  try {
    // `/posts/${postId}`는 실제 백엔드의 단일 게시물 조회 API 엔드포인트로 변경해야 합니다.
    const response = await api.get<Post>(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch post with ID ${postId}:`, error);
    throw error;
  }
};

/**
 * @function updatePost
 * @description 특정 ID를 가진 게시물을 수정하는 API를 호출합니다.
 * @param {string} postId - 수정할 게시물의 ID
 * @param {UpdatePostPayload} postData - 업데이트할 게시물 데이터 (일부 필드만 포함 가능)
 * @returns {Promise<Post>} - 수정된 게시물 정보
 * @throws {Error} - 게시물 수정 실패 시 에러 발생
 */
export const updatePost = async (postId: string, postData: UpdatePostPayload): Promise<Post> => {
  try {
    // `/posts/${postId}`는 실제 백엔드의 게시물 수정 API 엔드포인트로 변경해야 합니다.
    const response = await api.put<Post>(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update post with ID ${postId}:`, error);
    throw error;
  }
};

/**
 * @function deletePost
 * @description 특정 ID를 가진 게시물을 삭제하는 API를 호출합니다.
 * @param {string} postId - 삭제할 게시물의 ID
 * @returns {Promise<void>}
 * @throws {Error} - 게시물 삭제 실패 시 에러 발생
 */
export const deletePost = async (postId: string): Promise<void> => {
  try {
    // `/posts/${postId}`는 실제 백엔드의 게시물 삭제 API 엔드포인트로 변경해야 합니다.
    await api.delete(`/posts/${postId}`);
    console.log(`Post with ID ${postId} deleted successfully.`);
  } catch (error) {
    console.error(`Failed to delete post with ID ${postId}:`, error);
    throw error;
  }
};
