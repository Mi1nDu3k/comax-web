// src/components/ui/Pagination.tsx
'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Hàm tạo URL cho trang mới giữ nguyên các params khác
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      
      {/* Nút Previous */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`p-2 rounded-lg border dark:border-gray-700 ${
          currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      {/* Hiển thị số trang (Đơn giản hóa) */}
      <span className="text-sm font-medium px-4">
        Trang {currentPage} / {totalPages}
      </span>

      {/* Nút Next */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`p-2 rounded-lg border dark:border-gray-700 ${
          currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}