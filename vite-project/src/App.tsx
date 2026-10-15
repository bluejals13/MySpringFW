import React, { useState } from 'react';
import DepartmentPage from './components/DepartmentPage';
import StudentPage from './components/StudentPage';
import UserPage from './components/UserPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'department' | 'student' | 'user'>('department');

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '15px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, color: '#1e293b' }}>🎓 캠퍼스 시큐리티 & 아키텍처 대시보드</h1>
        <p style={{ margin: '5px 0 0 0', color: '#64748b' }}>
          Spring Boot 백엔드와 연동된 도메인별(1:N / 1:1) 시뮬레이션 및 예외 처리 테스트 플랫폼
        </p>
      </header>

      {/* 탭 네비게이션 버튼 */}
      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setCurrentTab('department')}
          style={{ padding: '10px 20px', background: currentTab === 'department' ? '#2563eb' : '#e2e8f0', color: currentTab === 'department' ? '#fff' : '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🏛️ 학과 관리 (1:N)
        </button>
        <button
          onClick={() => setCurrentTab('student')}
          style={{ padding: '10px 20px', background: currentTab === 'student' ? '#2563eb' : '#e2e8f0', color: currentTab === 'student' ? '#fff' : '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          👩‍🎓 학생/상세정보 (1:1)
        </button>
        <button
          onClick={() => setCurrentTab('user')}
          style={{ padding: '10px 20px', background: currentTab === 'user' ? '#2563eb' : '#e2e8f0', color: currentTab === 'user' ? '#fff' : '#334155', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          👤 회원 관리
        </button>
      </nav>

      {/* 선택된 탭 컴포넌트 렌더링 */}
      <main>
        {currentTab === 'department' && <DepartmentPage />}
        {currentTab === 'student' && <StudentPage />}
        {currentTab === 'user' && <UserPage />}
      </main>

      <footer style={{ marginTop: '50px', borderTop: '1px solid #e2e8f0', paddingTop: '15px', textAlign: 'center', color: '#94a3b8' }}>
        <small>© 2026 Spring-React Security Architecture Showcase</small>
      </footer>
    </div>
  );
}