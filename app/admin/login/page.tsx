'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import { getBasePath } from '@/lib/getBasePath';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Basit şifre kontrolü (production'da daha güvenli bir yöntem kullanılmalı)
  const ADMIN_PASSWORD = 'bagkent2024'; // Bu şifreyi değiştirmeyi unutmayın!

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Şifre kontrolü
    if (password === ADMIN_PASSWORD) {
      // Session'a kaydet
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_login_time', Date.now().toString());
        
        // BasePath ile redirect yap
        const basePath = getBasePath();
        const dashboardUrl = `${basePath}/admin/dashboard`;
        window.location.href = dashboardUrl;
      }
    } else {
      setError('Hatalı şifre! Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Girişi</h1>
          <p className="text-gray-600">BağKent A.Ş. Yönetim Paneli</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Admin şifresini girin"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Giriş yapılıyor...'
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Giriş Yap
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Yönetim paneline erişim için yetkili kişiler tarafından kullanılmalıdır.</p>
        </div>
      </motion.div>
    </div>
  );
}

