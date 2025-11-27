'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// 1. Import Context và Icons cần thiết
import { useAuth } from '@/context/AuthContext';
import { Search, Menu, X, BookOpen, LogOut, LayoutDashboard, User as UserIcon } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  // 2. Lấy thông tin user từ Context
  const { user, logout } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State cho dropdown Avatar
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. LOGO */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl text-blue-600 dark:text-blue-500">
          <BookOpen className="w-8 h-8" />
          <span>Comax</span>
        </Link>

        {/* 2. DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-white transition">Trang chủ</Link>
          <Link href="/genres/all" className="hover:text-blue-600 dark:hover:text-white transition">Thể loại</Link>
          <Link href="/ranking" className="hover:text-blue-600 dark:hover:text-white transition">Xếp hạng</Link>
          <Link href="/history" className="hover:text-blue-600 dark:hover:text-white transition">Lịch sử</Link>
        </nav>

        {/* 3. RIGHT SECTION (Search + Auth) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative group">
            <input 
              type="text" 
              placeholder="Tìm truyện..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-64 text-sm rounded-full border border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all"
            />
            <button type="submit" title="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Auth Area */}
          <div className="flex items-center gap-2 border-l pl-4 border-gray-200 dark:border-gray-700">
            
            {/* Nút Dark Mode */}
            <ThemeToggle />

            {/* --- LOGIC CHECK ĐĂNG NHẬP --- */}
            {!user ? (
              // 🟢 TRƯỜNG HỢP 1: CHƯA ĐĂNG NHẬP
              <>
                <Link href="/auth/login">
                  <button className="text-sm font-semibold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white px-2">
                    Login
                  </button>
                </Link>
                <Link href="/auth/register">
                  <button className="px-4 py-1.5 text-sm bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition shadow-md">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              // 🟢 TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP (Hiện Avatar)
              <div className="relative ml-2">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate hidden lg:block">
                    Hi, {user.username}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200 group-hover:border-blue-400 transition">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu Avatar */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Đăng nhập với tên</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.username}</p>
                    </div>
                    
                    <div className="py-1">
                      {/* Nếu là Admin thì hiện link Dashboard */}
                      {(user.role === 'Admin' || user.role === 'admin') && (
                        <Link 
                          href="/admin" 
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-500" /> Dashboard Quản trị
                        </Link>
                      )}
                      
                      <Link 
                        href="/profile" 
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                         <UserIcon className="w-4 h-4" /> Trang cá nhân
                      </Link>
                      
                      <div className="border-t dark:border-gray-700 my-1"></div>
                      
                      <button 
                        onClick={() => { logout(); setIsUserMenuOpen(false); }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                         <LogOut className="w-4 h-4" /> Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* ----------------------------- */}

          </div>
        </div>

        {/* 4. MOBILE MENU BUTTON */}
        <button 
          className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          onClick={toggleMenu}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 5. MOBILE NAVIGATION DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t dark:bg-gray-900 dark:border-gray-800 p-4 absolute w-full shadow-xl animate-in slide-in-from-top-2 h-screen z-50">
          <div className="flex flex-col space-y-4">
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
               <input 
                 type="text" 
                 placeholder="Tìm truyện..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-9 pr-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
               />
               <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"/>
            </form>

            <div className="space-y-2">
              <Link href="/" onClick={toggleMenu} className="block py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-700 dark:text-gray-200">Trang chủ</Link>
              <Link href="/genres/all" onClick={toggleMenu} className="block py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-700 dark:text-gray-200">Thể loại</Link>
              <Link href="/ranking" onClick={toggleMenu} className="block py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-700 dark:text-gray-200">Xếp hạng</Link>
              <Link href="/history" onClick={toggleMenu} className="block py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-gray-700 dark:text-gray-200">Lịch sử đọc</Link>
            </div>
            
            <hr className="dark:border-gray-700"/>
            
            {/* Mobile Auth Actions */}
            {!user ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link href="/auth/login" className="w-full" onClick={toggleMenu}>
                        <button className="w-full py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-center font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-white">
                            Login
                        </button>
                    </Link>
                    <Link href="/auth/register" className="w-full" onClick={toggleMenu}>
                        <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-center font-semibold text-sm hover:bg-blue-700 shadow">
                            Sign Up
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-white">{user.username}</span>
                    </div>
                    
                    {(user.role === 'Admin' || user.role === 'admin') && (
                        <Link href="/admin" onClick={toggleMenu} className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                    )}

                    <button onClick={() => { logout(); toggleMenu(); }} className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <LogOut className="w-4 h-4" /> Đăng xuất
                    </button>
                </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}