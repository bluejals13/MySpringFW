import React, { useState } from 'react';
import { apiClient } from '../api/client';

export default function UserPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      setMsg(null);
      await apiClient.post('/api/users', { email, name, password });
      setMsg(`회원(${email}) 등록이 완료되었습니다.`);
      setEmail('');
      setName('');
      setPassword('');
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h2>👤 회원(User) 관리 도메인</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
        시스템 관리자 및 사용자 계정 등록과 이메일 중복 검증 로직을 처리합니다.
      </p>

      {errorMsg && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>🚨 {errorMsg}</div>}
      {msg && <div style={{ background: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>✅ {msg}</div>}

      <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="email" placeholder="회원 이메일" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '8px' }} />
        <input type="text" placeholder="회원 이름" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '8px' }} />
        <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '8px' }} />
        <button type="submit" style={{ background: '#475569', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>회원 생성</button>
      </form>
    </div>
  );
}