// src/app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Gửi dữ liệu đăng ký đến API .NET (axios.post('/api/auth/register', formData))
    console.log('Đang đăng ký với:', formData);

    await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập mạng
    
    //TODO: Xử lý phản hồi (thành công -> chuyển hướng đến trang đăng nhập)
    alert('Đăng ký thành công! (Giả lập)');
    
    setIsLoading(false);
    // router.push('/auth/login'); 
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 shadow-xl rounded-xl border dark:border-gray-800">
        
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <UserPlus className="w-7 h-7 text-green-600" /> Tạo Tài Khoản
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên người dùng (Username)</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
          </div>
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition ${
              isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Tạo Tài Khoản'}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Đã có tài khoản?{' '}
          <Link href="/auth/login" className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}