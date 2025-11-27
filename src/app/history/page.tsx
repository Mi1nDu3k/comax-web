// src/app/history/page.tsx
'use client';

import { useEffect, useState } from 'react';
// Đảm bảo đường dẫn import đúng từ @/utils/history
import { getHistory, removeFromHistory, clearHistory, HistoryItem } from '@/utils/history';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { formatTimeAgo } from '@/utils/format';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const data = getHistory(); 
    setHistory(data);
  }, []);

  const handleRemove = (slug: string) => {
    const newList = removeFromHistory(slug);
    setHistory(newList);
  };

  const handleClearAll = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
      clearHistory();
      setHistory([]);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <div className="flex justify-between items-center mb-8 border-b pb-4 dark:border-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Clock className="w-7 h-7 text-blue-600" /> Lịch Sử Đọc Truyện
        </h1>
        {history.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition"
          >
            <Trash2 className="w-4 h-4" /> Xóa tất cả
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item) => (
            <div key={item.id} className="flex bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm border dark:border-gray-800 hover:shadow-md transition group">
              <Link href={`/comic/${item.id}`} className="relative w-20 h-28 flex-shrink-0 rounded overflow-hidden">
                <Image 
                    src={item.cover} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition"
                    unoptimized={true}
                />
              </Link>
              <div className="ml-4 flex-grow flex flex-col justify-between">
                <div>
                  <Link href={`/comic/${item.id}`} className="font-bold text-gray-800 dark:text-gray-100 line-clamp-1 hover:text-blue-600 transition">
                    {item.title}
                  </Link>
                  <Link href={`/read/${item.id}/${item.chapterSlug}`} className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1 flex items-center gap-1 hover:underline">
                    Đọc tiếp: {item.chapterTitle} <ChevronRight className="w-3 h-3" />
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTimeAgo(item.readAt)}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => handleRemove(item.id)} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition p-1">
                    <Trash2 className="w-3 h-3" /> Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl border-dashed border-2 dark:border-gray-800">
          <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Bạn chưa đọc bộ truyện nào.</p>
          <Link href="/" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Khám phá ngay
          </Link>
        </div>
      )}
    </div>
  );
}