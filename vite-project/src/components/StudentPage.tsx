import React, { useEffect, useState } from 'react';
import { studentApi, departmentApi, Student, Department } from '../api/campusApi';

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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
      setErrorMsg(err.message);
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
      setErrorMsg(err.message); // 예: STUDENT_NUMBER_DUPLICATE, EMAIL_DUPLICATE 등
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h2>👩‍🎓 학생 및 상세정보 도메인 (1:1 연관관계 & Fetch Join)</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
        학생과 상세정보의 라이프사이클 통합 관리 및 중복 필드 검증 로직을 실습합니다.
      </p>

      {errorMsg && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>🚨 {errorMsg}</div>}
      {successMsg && <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>✅ {successMsg}</div>}

      <form onSubmit={handleCreateStudent} style={{ background: '#f8fafc', padding: '15px', borderRadius: '6px', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
        <button type="submit" style={{ gridColumn: 'span 2', background: '#059669', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>학생 등록 (상세정보 포함)</button>
      </form>

      <h3>학생 목록 현황</h3>
      {loading ? <p>로딩 중...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {students.map((st) => (
            <li key={st.id} style={{ background: '#f1f5f9', padding: '10px', marginBottom: '8px', borderRadius: '6px' }}>
              <strong>{st.name}</strong> [{st.studentNumber}]
              <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>
                📧 이메일: {st.detailResponse?.email || '미등록'} | 📞 연락처: {st.detailResponse?.phoneNumber || '미등록'} | 🏠 주소: {st.detailResponse?.address || '미등록'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}