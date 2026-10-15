import React, { useState } from 'react';
import { api } from '../api/axiosInstance';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg(null);

      // 백엔드 실제 로그인 엔드포인트 경로: /api/userinfos/login
      const response = await api.post('/api/userinfos/login', { email, password });
      
      // 백엔드 AuthResponse 구조에 맞춰 토큰 추출 (token 또는 accessToken)
      const token = response.data.token || response.data.accessToken;
      if (token) {
        localStorage.setItem('token', token);
        onLoginSuccess(); // 로그인 성공 콜백 실행
      } else {
        throw new Error('토큰이 응답에 포함되어 있지 않습니다.');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || '로그인에 실패했습니다. (이메일 혹은 비밀번호를 확인해주세요)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '10px', color: '#1e293b', textAlign: 'center' }}>🔐 시스템 로그인</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', marginBottom: '20px' }}>
        JWT 인증을 위해 계정 정보를 입력해주세요.
      </p>

      {errorMsg && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '0.9rem' }}>🚨 {errorMsg}</div>}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>이메일</label>
          <input 
            type="email" 
            placeholder="user@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>비밀번호</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} 
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
}