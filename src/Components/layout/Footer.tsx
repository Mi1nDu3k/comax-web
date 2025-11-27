// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Mail, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Intro */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Comax
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed pr-4 max-w-md">
              Nền tảng đọc truyện tranh trực tuyến miễn phí với kho truyện khổng lồ, cập nhật liên tục hàng ngày. 
              Trải nghiệm đọc truyện mượt mà trên mọi thiết bị.
            </p>
            <div className="flex gap-4 pt-2">
               <a href="#" className="hover:text-blue-500 transition"><Facebook className="w-5 h-5" /></a>
               <a href="#" className="hover:text-sky-400 transition"><Twitter className="w-5 h-5" /></a>
               <a href="#" className="hover:text-red-500 transition"><Mail className="w-5 h-5" /></a>
               <a href="#" className="hover:text-white transition"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Khám phá</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition">Trang chủ</Link></li>
              <li><Link href="/genres/all" className="hover:text-blue-400 transition">Thể loại</Link></li>
              <li><Link href="/ranking" className="hover:text-blue-400 transition">Bảng xếp hạng</Link></li>
              <li><Link href="/history" className="hover:text-blue-400 transition">Lịch sử đọc</Link></li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Thông tin</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-blue-400 transition">Giới thiệu</Link></li>
              <li><Link href="/policy" className="hover:text-blue-400 transition">Chính sách bảo mật</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition">Điều khoản dịch vụ</Link></li>
              <li><Link href="/dmca" className="hover:text-blue-400 transition">Khiếu nại bản quyền</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {currentYear} Comax Inc. All rights reserved.</p>
          <div className="mt-2 md:mt-0 space-x-4">
             <span>Made by me</span>
          </div>
        </div>
      </div>
    </footer>
  );
}