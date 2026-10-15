import React, { useEffect, useState } from 'react';
import { api } from '../api/axiosInstance'; // 통합된 axios 인스턴스 사용

interface User {
  id: number;
  email: string;
  name: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 회원 목록 조회
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get<User[]>('/api/users');
      setUsers(response.data);
    } catch (err: any) {
      // API가 아직 구현되지 않았거나 권한 문제가 있을 경우 부드럽게 처리
      console.warn('회원 목록 조회 실패:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      setMsg(null);
      await api.post('/api/users', { email, name, password });
      setMsg(`회원(${email}) 등록이 완료되었습니다.`);
      setEmail('');
      setName('');
      setPassword('');
      fetchUsers(); // 등록 후 목록 새로고침
    } catch (err: any) {
      setErrorMsg(err.message || '회원 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h2>👤 회원(User) 관리 도메인</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
        시스템 관리자 및 사용자 계정 등록과 이메일 중복 검증 로직을 처리합니다.
      </p>

      {errorMsg && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>🚨 {errorMsg}</div>}
      {msg && <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>✅ {msg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* 회원 등록 폼 */}
        <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '15px', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#334155' }}>새 회원 등록</h3>
          <input type="email" placeholder="회원 이메일" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '8px' }} />
          <input type="text" placeholder="회원 이름" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '8px' }} />
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '8px' }} />
          <button type="submit" style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>회원 생성</button>
        </form>

        {/* 회원 목록 현황 */}
        <div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#334155' }}>등록된 회원 목록</h3>
          {loading ? (
            <p>로딩 중...</p>
          ) : users.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>등록된 회원이 없거나 백엔드 목록 API 조회를 지원하지 않습니다.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
              {users.map((u) => (
                <li key={u.id} style={{ background: '#f1f5f9', padding: '8px 12px', marginBottom: '6px', borderRadius: '4px', fontSize: '0.9rem' }}>
                  <strong>{u.name}</strong> ({u.email})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}