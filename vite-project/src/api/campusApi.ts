import { api } from './axiosInstance';
import type { DepartmentRequest, DepartmentResponse, StudentRequest, StudentResponse } from '../types/campus';

// 학과 API
export const departmentApi = {
  getAll: async () => {
    const response = await api.get<DepartmentResponse[]>('/api/departments');
    return response.data;
  },

  getPaged: async (page = 0, size = 10) => {
    const response = await api.get<{ content: DepartmentResponse[]; totalElements: number }>(
      `/api/departments/paged?page=${page}&size=${size}`
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<DepartmentResponse>(`/api/departments/${id}`);
    return response.data;
  },

  getStudentsByDeptId: async (id: number) => {
    const response = await api.get<any[]>(`/api/departments/${id}/students`);
    return response.data;
  },

  create: async (data: DepartmentRequest) => {
    const response = await api.post<DepartmentResponse>('/api/departments', data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/api/departments/${id}`);
  },
};

// 학생 API
export const studentApi = {
  getAll: async () => {
    const response = await api.get<{ content: StudentResponse[] } | StudentResponse[]>('/api/students');
    return Array.isArray(response.data) ? response.data : response.data.content;
  },

  search: async (keyword?: string, page = 0, size = 10) => {
  // 안전한 경로: /api/search/students?keyword=...
  // 취약한 경로: /api/vuln/sqli/students?name=...
    const query = keyword ? `keyword=${keyword}&` : '';
    const response = await api.get<{ content: StudentResponse[]; totalElements: number }>(
      `/api/vuln/sqli/students?name=${keyword}`
    );
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<StudentResponse>(`/api/students/${id}`);
    return response.data;
  },

  create: async (data: StudentRequest) => {
    const response = await api.post<StudentResponse>('/api/students', data);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/api/students/${id}`);
  },
};