'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from 'lucide-react';

const MENU = [
  { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
  { name: 'Quản lý Truyện', href: '/admin/comics', icon: BookOpen },
  { name: 'Quản lý User', href: '/admin/users', icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 z-20 transition-all">
      <div className="h-16 flex items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold text-white tracking-wider">COMAX ADMIN</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {MENU.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition">
           <LogOut className="w-5 h-5" />
           <span className="font-medium">Về trang chủ</span>
        </Link>
      </div>
    </aside>
  );
}