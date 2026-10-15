import { useState } from 'react';
import DepartmentPage from './components/DepartmentPage';
import StudentPage from './components/StudentPage';
import UserPage from './components/UserPage';
import LoginForm from './components/LoginForm';

type TabType = 'department' | 'student' | 'user';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
  const [currentTab, setCurrentTab] = useState<TabType>('department');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  // 토큰이 없으면 로그인 화면 출력
  if (!isLoggedIn) {
    return <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      {/* 헤더 섹션 */}
      <header style={{ borderBottom: '2px solid #cbd5e1', paddingBottom: '15px', marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: '#1e293b', fontSize: '1.8rem' }}>🎓 캠퍼스 시큐리티 & 아키텍처 대시보드</h1>
          <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
            Spring Boot 백엔드와 연동된 도메인별(1:N / 1:1) 시뮬레이션 및 예외 처리 테스트 플랫폼
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', height: 'fit-content' }}
        >
          로그아웃
        </button>
      </header>

      {/* 탭 네비게이션 바 */}
      <nav style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TabButton active={currentTab === 'department'} onClick={() => setCurrentTab('department')} label="🏛️ 학과 관리 (1:N)" />
        <TabButton active={currentTab === 'student'} onClick={() => setCurrentTab('student')} label="👩‍🎓 학생/상세정보 (1:1)" />
        <TabButton active={currentTab === 'user'} onClick={() => setCurrentTab('user')} label="👤 회원 관리" />
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <main>
        {currentTab === 'department' && <DepartmentPage />}
        {currentTab === 'student' && <StudentPage />}
        {currentTab === 'user' && <UserPage />}
      </main>

      <footer style={{ marginTop: '50px', borderTop: '1px solid #e2e8f0', paddingTop: '15px', textAlign: 'center', color: '#94a3b8' }}>
        <small>© 2026 Spring-React Security Architecture Showcase. All rights reserved.</small>
      </footer>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function TabButton({ active, onClick, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        background: active ? '#2563eb' : '#ffffff',
        color: active ? '#fff' : '#334155',
        border: active ? '1px solid #2563eb' : '1px solid #cbd5e1',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        boxShadow: active ? '0 2px 4px rgba(37, 99, 235, 0.2)' : 'none',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {label}
    </button>
  );
}