import React, { useEffect, useState } from 'react';
import { studentApi, departmentApi } from '../api/campusApi';
import type { Student, Department } from '../types/campus';

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // 검색어 상태 및 핸들러
  const [keyword, setKeyword] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      setLoading(true);
      const data = await studentApi.search(keyword);
      setStudents(data.content || data);
    } catch (err: any) {
      setErrorMsg(err.message || '검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 등록 폼 상태
  const [name, setName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [departmentId, setDepartmentId] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const [sData, dData] = await Promise.all([studentApi.getAll(), departmentApi.getAll()]);
      setStudents(sData);
      setDepartments(dData);
      if (dData.length > 0) setDepartmentId(dData[0].id);
    } catch (err: any) {
      setErrorMsg(err.message || '데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      await studentApi.create({
        name,
        studentNumber,
        departmentId,
        detailRequest: {
          email,
          phoneNumber,
          address,
          dateOfBirth,
        },
      });
      setSuccessMsg(`학생 "${name}" (${studentNumber}) 등록 완료!`);
      setName('');
      setStudentNumber('');
      setEmail('');
      setPhoneNumber('');
      setAddress('');
      setDateOfBirth('');
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message || '학생 등록에 실패했습니다.');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h2>👩‍🎓 학생 및 상세정보 도메인 (1:1 연관관계 & Fetch Join)</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
        학생과 상세정보의 라이프사이클 통합 관리 및 중복 필드 검증 로직을 실습합니다.
      </p>

      {errorMsg && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>🚨 {errorMsg}</div>}
      {successMsg && <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>✅ {successMsg}</div>}

      {/* 학생 등록 폼 */}
      <form onSubmit={handleCreateStudent} style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px', marginBottom: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <input type="text" placeholder="학생 이름" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '8px' }} />
        <input type="text" placeholder="학번 (예: 2026001)" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} required style={{ padding: '8px' }} />
        <select value={departmentId} onChange={(e) => setDepartmentId(Number(e.target.value))} style={{ padding: '8px' }}>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
          ))}
        </select>
        <input type="email" placeholder="이메일 (중복 불가)" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '8px' }} />
        <input type="text" placeholder="전화번호 (중복 불가)" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required style={{ padding: '8px' }} />
        <input type="text" placeholder="주소" value={address} onChange={(e) => setAddress(e.target.value)} style={{ padding: '8px' }} />
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} style={{ padding: '8px', gridColumn: 'span 2' }} />
        <button type="submit" style={{ gridColumn: 'span 2', background: '#059669', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>학생 등록 (상세정보 포함)</button>
      </form>

      {/* 🔍 학생 검색 바 (SQLi 방어 실습용) */}
      <div style={{ marginBottom: '20px', background: '#f1f5f9', padding: '15px', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#334155' }}>🔎 학생 통합 검색 (보안 검증)</h3>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="검색어 입력 (예: Alice 또는 페이로드)" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            style={{ padding: '8px', flex: 1, border: '1px solid #cbd5e1', borderRadius: '4px' }} 
          />
          <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>검색</button>
          <button type="button" onClick={fetchData} style={{ background: '#64748b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>전체 목록</button>
        </form>
      </div>

      <h3>학생 목록 현황</h3>
      {loading ? <p>로딩 중...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {students.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>조회된 학생이 없습니다.</p>
          ) : (
            students.map((st) => (
              <li 
                key={st.id} 
                style={{ background: '#f1f5f9', padding: '10px', marginBottom: '8px', borderRadius: '6px' }}
              >
                <strong>{st.name}</strong> [{st.studentNumber}] {st.department && `(${st.department.name})`}
                <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>
                  📧 이메일: {st.detail?.email || '미등록'} | 📞 연락처: {st.detail?.phoneNumber || '미등록'} | 🏠 주소: {st.detail?.address || '미등록'}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}