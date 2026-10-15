import React, { useEffect, useState } from 'react';
import { departmentApi, studentApi, Department, Student } from '../api/campusApi';

export default function SystemBlueprintView() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 새 학과 입력 폼 상태
  const [deptName, setDeptName] = useState('');
  const [deptCode, setDeptCode] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const [deptData, studentData] = await Promise.all([
        departmentApi.getAll(),
        studentApi.getAll(),
      ]);
      setDepartments(deptData);
      setStudents(studentData);
    } catch (err: any) {
      setErrorMsg(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 학과 등록 핸들러 (중복 코드/이름 예외 테스트 가능)
  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      await departmentApi.create({ name: deptName, code: deptCode });
      setSuccessMsg(`성공적으로 학과(${deptName})가 등록되었습니다.`);
      setDeptName('');
      setDeptCode('');
      fetchData();
    } catch (err: any) {
      // 백엔드의 BusinessException 에러 메시지(예: DEPARTMENT_CODE_DUPLICATE)가 출력됨
      setErrorMsg(err.message);
    }
  };

  // 학과 삭제 핸들러 (학생이 남아있을 경우 DEPARTMENT_HAS_STUDENTS 에러 발생 테스트)
  const handleDeleteDepartment = async (id: number) => {
    if (!window.confirm('정말 이 학과를 삭제하시겠습니까?')) return;
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      await departmentApi.delete(id);
      setSuccessMsg('학과가 삭제되었습니다.');
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message); // 예: "Cannot delete department with id: 1. It has X students"
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* 알림 영역 */}
      <div style={{ gridColumn: 'span 2' }}>
        {errorMsg && (
          <div style={{ background: '#ffdddd', color: '#d8000c', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
            🚨 <strong>백엔드 비즈니스 예외 발생:</strong> {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ background: '#dff2bf', color: '#4f8a10', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
            ✅ {successMsg}
          </div>
        )}
      </div>

      {/* 좌측: 학과 관리 및 목록 */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2>🏛️ 학과 관리</h2>
        <form onSubmit={handleCreateDepartment} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <input
            type="text"
            placeholder="학과 이름 (예: 컴퓨터공학과)"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="text"
            placeholder="학과 코드 (예: CS)"
            value={deptCode}
            onChange={(e) => setDeptCode(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ background: '#2c3e50', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
            학과 등록 (중복 예외 테스트 가능)
          </button>
        </form>

        <h3>학과 목록 (집계 쿼리 최적화 뷰)</h3>
        {loading ? <p>로딩 중...</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {departments.map((dept) => (
              <li key={dept.id} style={{ background: 'white', padding: '10px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #eee' }}>
                <div>
                  <strong>{dept.name}</strong> ({dept.code}) <br />
                  <small style={{ color: '#666' }}>소속 학생 수: {dept.studentCount ?? 0}명</small>
                </div>
                <button
                  onClick={() => handleDeleteDepartment(dept.id)}
                  style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 우측: 학생 현황 대시보드 */}
      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h2>👩‍🎓 학생 현황 (N+1 방지 Fetch Join 적용)</h2>
        {loading ? <p>로딩 중...</p> : (
          <ul style={{ listStyle: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto' }}>
            {students.map((student) => (
              <li key={student.id} style={{ background: 'white', padding: '10px', marginBottom: '8px', border: '1px solid #eee' }}>
                <div><strong>{student.name}</strong> ({student.studentNumber})</div>
                <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '4px' }}>
                  이메일: {student.detailResponse?.email || '미등록'} | 전화번호: {student.detailResponse?.phoneNumber || '미등록'}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}