import React, { useEffect, useState } from 'react';
import { departmentApi } from '../api/campusApi';
import type { Department } from '../types/campus';

export default function DepartmentPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await departmentApi.getAll();
      setDepartments(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      await departmentApi.create({ name, code });
      setSuccessMsg(`학과 "${name}" (${code}) 가 성공적으로 생성되었습니다.`);
      setName('');
      setCode('');
      fetchDepartments();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('정말 이 학과를 삭제하시겠습니까?')) return;
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      await departmentApi.delete(id);
      setSuccessMsg('학과가 삭제되었습니다.');
      fetchDepartments();
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h2>🏛️ 학과 관리 도메인 (1:N 집계 최적화)</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
        학과 삭제 시 소속 학생 존재 여부를 검사하는 비즈니스 로직과 집계 쿼리를 검증합니다.
      </p>

      {errorMsg && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>🚨 {errorMsg}</div>}
      {successMsg && <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>✅ {successMsg}</div>}

      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input type="text" placeholder="학과 이름" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '8px', flex: 1 }} />
        <input type="text" placeholder="학과 코드 (예: CS)" value={code} onChange={(e) => setCode(e.target.value)} required style={{ padding: '8px', width: '120px' }} />
        <button type="submit" style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>학과 등록</button>
      </form>

      {loading ? <p>로딩 중...</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>학과명</th>
              <th style={{ padding: '10px' }}>코드</th>
              <th style={{ padding: '10px' }}>소속 학생 수</th>
              <th style={{ padding: '10px' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '10px' }}>{dept.id}</td>
                <td style={{ padding: '10px' }}>{dept.name}</td>
                <td style={{ padding: '10px' }}>{dept.code}</td>
                <td style={{ padding: '10px' }}><strong>{dept.studentCount ?? 0}명</strong></td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handleDelete(dept.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}