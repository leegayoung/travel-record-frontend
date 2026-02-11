// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi'; // 로그인 API 함수 임포트
import styles from './LoginPage.module.css'; // CSS 모듈 임포트

/**
 * @function LoginPage
 * @description 사용자 로그인을 위한 페이지 컴포넌트입니다.
 * 아이디와 비밀번호를 입력받아 로그인 API를 호출하고, 성공 시 메인 페이지로 이동합니다.
 */
const LoginPage: React.FC = () => {
  // 아이디(username)와 비밀번호(password) 입력 필드의 상태를 관리합니다.
  // useState 훅은 컴포넌트 내에서 변경 가능한 상태를 관리할 때 사용합니다.
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // 로그인 에러 메시지 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 관리

  // useNavigate 훅은 React Router에서 페이지를 프로그램적으로 이동시킬 때 사용합니다.
  const navigate = useNavigate();

  /**
   * @function handleSubmit
   * @description 로그인 폼 제출 시 실행되는 함수입니다.
   * @param {React.FormEvent} e - 폼 이벤트 객체
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼의 기본 제출 동작(페이지 새로고침)을 방지합니다.
    setError(null); // 이전 에러 메시지 초기화
    setLoading(true); // 로딩 시작

    try {
      // authApi.login 함수를 호출하여 백엔드에 로그인 요청을 보냅니다.
      await login({ email, password });
      // 로그인 성공 시, 메인 페이지(게시물 목록 페이지)로 이동합니다.
      navigate('/posts');
    } catch (err) {
      console.error('Login failed:', err);
      // 로그인 실패 시 에러 메시지를 상태에 저장하여 사용자에게 표시합니다.
      setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper + " bg-white rounded-lg shadow-lg"}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">로그인</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              이메일
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 입력 값 변경 시 상태 업데이트
              required // 필수 입력 필드
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 입력 값 변경 시 상태 업데이트
              required // 필수 입력 필드
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={loading} // 로딩 중일 때는 버튼 비활성화
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-bold text-blue-500 hover:text-blue-800 focus:outline-none"
            >
              회원가입
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
