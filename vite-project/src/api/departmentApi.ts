import { api } from './axiosInstance';

export interface Department {
  id: number;
  name: string;
  code: string;
  studentCount?: number;
}

export interface DepartmentRequest {
  name: string;
  code: string;
}

export interface DepartmentResponse extends Department {}

export const departmentApi = {
  // 전체 목록 조회 (리스트)
  getAll: async () => {
    const response = await api.get<Department[]>('/api/departments');
    return response.data;
  },

  // 학과 목록 조회 (페이징)
  getPaged: async (page = 0, size = 10) => {
    const response = await api.get<{ content: DepartmentResponse[]; totalElements: number }>(
      `/api/departments/paged?page=${page}&size=${size}`
    );
    return response.data;
  },

  // 단건 조회 (ID)
  getById: async (id: number) => {
    const response = await api.get<DepartmentResponse>(`/api/departments/${id}`);
    return response.data;
  },

  // 특정 학과 학생 목록 조회
  getStudentsByDeptId: async (id: number) => {
    const response = await api.get<any[]>(`/api/departments/${id}/students`);
    return response.data;
  },

  // 등록 (ADMIN 전용)
  create: async (data: DepartmentRequest) => {
    const response = await api.post<DepartmentResponse>('/api/departments', data);
    return response.data;
  },

  // 삭제
  delete: async (id: number) => {
    await api.delete(`/api/departments/${id}`);
  },
};