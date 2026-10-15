import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8081', // 백엔드 서버 포트 통일 (필요 시 8081 등으로 변경)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 1. 요청 인터셉터: 로컬 스토리지에서 JWT 토큰을 가져와 헤더에 자동 주입
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. 응답 인터셉터: 백엔드의 BusinessException(ErrorObject) 공통 에러 파싱
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const errorObject = error.response.data;
      return Promise.reject(new Error(errorObject.message || '알 수 없는 오류가 발생했습니다.'));
    }
    return Promise.reject(error);
  }
);