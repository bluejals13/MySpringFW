import { api } from './axiosInstance';
import { DepartmentResponse, DepartmentSimpleResponse, DepartmentRequest } from '../types/department';
import { StudentResponse } from '../types/student';

export const departmentApi = {
  // 학과 목록 조회 (페이징)
  getPaged: (page = 0, size = 10) => 
    api.get<{ content: DepartmentResponse[]; totalElements: number }>(`/api/departments/paged?page=${page}&size=${size}`),

  // 단건 조회 (ID)
  getById: (id: number) => 
    api.get<DepartmentResponse>(`/api/departments/${id}`),

  // 특정 학과 학생 목록 조회
  getStudentsByDeptId: (id: number) => 
    api.get<StudentResponse[]>(`/api/departments/${id}/students`),

  // 등록 (ADMIN 전용)
  create: (data: DepartmentRequest) => 
    api.post<DepartmentResponse>('/api/departments', data),
};