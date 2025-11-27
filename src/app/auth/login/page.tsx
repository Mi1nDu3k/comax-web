// src/app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { login as apiLogin } from '@/services/auth.service'; 
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
 try {
        const response = await apiLogin(formData); 
        
        if (response && response.token) {
            login({
                token: response.token,
                username: response.username,
                role: response.role 
            });

            alert('Đăng nhập thành công!');

            if (response.role === 'Admin' || response.role === 'admin') {
                router.push('/admin'); 
            } else {
                router.push('/'); 
            }
        }
    } catch (error: any) {
        alert('Lỗi: ' + (error.message || 'Đăng nhập thất bại'));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 shadow-xl rounded-xl border dark:border-gray-800">
        
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <LogIn className="w-7 h-7 text-blue-600" /> Đăng Nhập
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email/Username Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email hoặc Tên người dùng</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="text"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Chưa có tài khoản?{' '}
          <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}