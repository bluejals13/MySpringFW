import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8081', // 백엔드 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 응답 인터셉터: 백엔드의 BusinessException 에러 메시지(ErrorObject) 공통 파싱
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      const errorObject = error.response.data;
      // 백엔드에서 내려준 message가 있다면 throw
      return Promise.reject(new Error(errorObject.message || '알 수 없는 오류가 발생했습니다.'));
    }
    return Promise.reject(error);
  }
);