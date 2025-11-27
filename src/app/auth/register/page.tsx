'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
// Import service
import { register } from '@/services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Chỉ dùng để validate ở frontend
  });

  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Xóa lỗi khi người dùng bắt đầu nhập lại
    if (status.error) setStatus(prev => ({ ...prev, error: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate Client
    if (formData.password !== formData.confirmPassword) {
      setStatus(prev => ({ ...prev, error: 'Mật khẩu nhập lại không khớp!' }));
      return;
    }

    if (formData.password.length < 6) {
        setStatus(prev => ({ ...prev, error: 'Mật khẩu phải có ít nhất 6 ký tự.' }));
        return;
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      // 2. Gọi API
      // Loại bỏ confirmPassword trước khi gửi vì Backend không cần
      const { confirmPassword, ...payload } = formData;
      
      await register(payload);

      // 3. Thành công
      setStatus({ loading: false, error: null, success: true });
      
      // Tự động chuyển trang sau 2 giây
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);

    } catch (error: any) {
      // 4. Xử lý lỗi từ Backend
      // Backend thường trả về message lỗi trong error.message hoặc error.response.data
      const errorMsg = error.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setStatus({ loading: false, error: errorMsg, success: false });
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4 min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border dark:border-gray-800">
        
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <UserPlus className="w-8 h-8 text-blue-600" /> Đăng Ký
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Tạo tài khoản để mở khóa các tính năng VIP</p>
        </div>

        {/* Thông báo Lỗi */}
        {status.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {status.error}
            </div>
        )}

        {/* Thông báo Thành công */}
        {status.success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-green-200">
                <CheckCircle className="w-4 h-4 flex-shrink-0" /> 
                Đăng ký thành công! Đang chuyển đến trang đăng nhập...
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên hiển thị</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="username"
                type="text"
                required
                placeholder="VD: ComaxReader"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
                disabled={status.loading || status.success}
              />
            </div>
          </div>
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
                disabled={status.loading || status.success}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
                disabled={status.loading || status.success}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nhập lại mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                name="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition"
                disabled={status.loading || status.success}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white transition-all transform active:scale-[0.98] ${
              status.loading || status.success
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
            disabled={status.loading || status.success}
          >
            {status.loading ? 'Đang tạo tài khoản...' : 'Đăng Ký Ngay'}
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400 pt-2">
          Đã có tài khoản?{' '}
          <Link href="/auth/login" className="font-bold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
            Đăng nhập tại đây
          </Link>
        </div>
      </div>
    </div>
  );
}