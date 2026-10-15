export interface DepartmentSimpleResponse {
  id: number;
  name: string;
  code: string;
  studentCount?: number;
}

export interface DepartmentResponse {
  id: number;
  name: string;
  code: string;
  studentCount: number;
  students: {
    id: number;
    name: string;
    studentNumber: string;
  }[];
}

export interface DepartmentRequest {
  name: string;
  code: string;
}