import { api } from './axiosInstance';

export interface StudentDetail {
  address: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
}

export interface Student {
  id: number;
  name: string;
  studentNumber: string;
  departmentName?: string;
  detailResponse?: StudentDetail;
}

export interface StudentRequest {
  [key: string]: any; // 필요한 필드 구조로 구체화 권장
}

export interface StudentResponse extends Student {}

export const studentApi = {
  // 학생 목록 조회 (Page 구조 및 List 구조 유연 대응)
  getAll: async () => {
    const response = await api.get<{ content: Student[] } | Student[]>('/api/students');
    return Array.isArray(response.data) ? response.data : response.data.content;
  },

  // 학생 통합 검색 (StudentSearchController 매핑)
  search: async (keyword?: string, page = 0, size = 10) => {
    const query = keyword ? `keyword=${keyword}&` : '';
    const response = await api.get<{ content: StudentResponse[]; totalElements: number }>(
      `/api/search/students?${query}page=${page}&size=${size}`
    );
    return response.data;
  },

  // 단건 조회
  getById: async (id: number) => {
    const response = await api.get<StudentResponse>(`/api/students/${id}`);
    return response.data;
  },

  // 학생 등록
  create: async (data: StudentRequest) => {
    const response = await api.post<StudentResponse>('/api/students', data);
    return response.data;
  },

  // 삭제
  delete: async (id: number) => {
    await api.delete(`/api/students/${id}`);
  },
};