import { apiClient } from './client';

export interface Department {
  id: number;
  name: string;
  code: string;
  studentCount?: number;
}

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

// 학과 API
export const departmentApi = {
  getAll: async () => {
    const response = await apiClient.get<Department[]>('/api/departments'); // 혹은 페이징 엔드포인트
    return response.data;
  },
  create: async (data: { name: string; code: string }) => {
    const response = await apiClient.post<Department>('/api/departments', data);
    return response.data;
  },
  delete: async (id: number) => {
    await apiClient.delete(`/api/departments/${id}`);
  },
};

// 학생 API
export const studentApi = {
  getAll: async () => {
    const response = await apiClient.get<{ content: Student[] } | Student[]>('/api/students');
    // Page 구조인지 List 구조인지에 따라 유연하게 대응
    return Array.isArray(response.data) ? response.data : response.data.content;
  },
  create: async (data: any) => {
    const response = await apiClient.post<Student>('/api/students', data);
    return response.data;
  },
  delete: async (id: number) => {
    await apiClient.delete(`/api/students/${id}`);
  },
};