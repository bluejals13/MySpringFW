// --- 학과 관련 타입 ---
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

// 기존 코드와의 호환성을 위한 별칭 (혹은 단일화)
export type Department = DepartmentSimpleResponse;


// --- 학생 관련 타입 ---
export interface StudentDetailResponse {
  id: number;
  address?: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
}

export interface StudentResponse {
  id: number;
  name: string;
  studentNumber: string;
  department?: DepartmentSimpleResponse;
  detail?: StudentDetailResponse; // 백엔드 응답 키값에 맞춤
}

export interface StudentDetailDTORequest {
  address?: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string;
}

export interface StudentRequest {
  name: string;
  studentNumber: string;
  departmentId: number;
  detailRequest: StudentDetailDTORequest;
}

// 기존 코드와의 호환성을 위한 별칭
export type Student = StudentResponse;