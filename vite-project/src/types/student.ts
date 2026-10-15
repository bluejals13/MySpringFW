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
  detail?: StudentDetailResponse;
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