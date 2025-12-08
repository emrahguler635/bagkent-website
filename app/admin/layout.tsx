'use client';

import { useEffect, useState } from 'react';
import { LogOut, Home, FileText } from 'lucide-react';
import SafeLink from '@/components/safe-link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pathname, setPathname] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Pathname'i al
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
      
      // Pathname değişikliklerini dinle
      const handleLocationChange = () => {
        setPathname(window.location.pathname);
      };
      window.addEventListener('popstate', handleLocationChange);
      return () => window.removeEventListener('popstate', handleLocationChange);
    }
  }, []);

  useEffect(() => {
    // Admin giriş sayfasındaysa kontrol yapma
    if (pathname === '/admin/login' || pathname === '/admin/login/' || pathname.endsWith('/admin/login')) {
      setChecking(false);
      return;
    }

    // Session kontrolü
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const auth = sessionStorage.getItem('admin_authenticated');
        const loginTime = sessionStorage.getItem('admin_login_time');
        
        if (auth === 'true' && loginTime) {
          // 8 saat geçmişse otomatik çıkış
          const timeDiff = Date.now() - parseInt(loginTime);
          const eightHours = 8 * 60 * 60 * 1000;
          
          if (timeDiff < eightHours) {
            setIsAuthenticated(true);
          } else {
            sessionStorage.removeItem('admin_authenticated');
            sessionStorage.removeItem('admin_login_time');
            window.location.href = '/admin/login';
          }
        } else {
          window.location.href = '/admin/login';
        }
        setChecking(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_authenticated');
      sessionStorage.removeItem('admin_login_time');
      window.location.href = '/admin/login';
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Login sayfası için layout gösterme
  if (pathname === '/admin/login' || pathname === '/admin/login/') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <h1 className="text-xl font-bold text-gray-900">BağKent Yönetim Paneli</h1>
              <nav className="hidden md:flex items-center gap-4">
                <SafeLink
                  href="/admin/dashboard"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/admin/dashboard' || pathname === '/admin/dashboard/' || pathname.includes('/admin/dashboard')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Dashboard
                  </div>
                </SafeLink>
                <SafeLink
                  href="/admin/projects"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === '/admin/projects' || pathname === '/admin/projects/' || pathname.includes('/admin/projects')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Projeler
                  </div>
                </SafeLink>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <SafeLink
                href="/"
                className="text-gray-700 hover:text-blue-600 text-sm font-medium"
              >
                Siteye Dön
              </SafeLink>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Çıkış
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

