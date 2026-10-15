import { api } from './axiosInstance';
import { StudentResponse, StudentRequest } from '../types/student';

export const studentApi = {
  // 학생 통합 검색 (StudentSearchController 매핑)
  search: (keyword?: string, page = 0, size = 10) => 
    api.get<{ content: StudentResponse[]; totalElements: number }>(
      `/api/search/students${keyword ? `?keyword=${keyword}&` : '?'}` + `page=${page}&size=${size}`
    ),

  // 단건 조회
  getById: (id: number) => 
    api.get<StudentResponse>(`/api/students/${id}`),

  // 학생 등록
  create: (data: StudentRequest) => 
    api.post<StudentResponse>('/api/students', data),
};