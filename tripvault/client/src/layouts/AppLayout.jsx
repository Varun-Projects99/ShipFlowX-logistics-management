import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';
import { AppSidebar } from './AppSidebar';

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: 'var(--bg-main)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <AppNavbar onToggleSidebar={toggleSidebar} />
      <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 70px)', overflow: 'hidden' }}>
        <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main style={{
          flex: 1,
          height: '100%',
          overflowY: 'auto',
          padding: '2rem 1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
