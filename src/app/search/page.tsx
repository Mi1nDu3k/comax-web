// src/app/search/page.tsx

import { searchComics } from '@/Data/searchMock';
import ComicCard from '@/Components/comics/ComicCard';
import { Search } from 'lucide-react';
import Link from 'next/link';

// 1. CẬP NHẬT TYPE: searchParams là Promise
interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage(props: SearchPageProps) {
  // 2. GIẢI QUYẾT PROMISE: Phải await props.searchParams
  const searchParams = await props.searchParams;
  
  // Lấy từ khóa, đảm bảo nó là string (vì searchParams có thể trả về array)
  const rawQuery = searchParams?.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : (rawQuery || '');

  // Fetch dữ liệu tìm kiếm
  const data = await searchComics(query);
  const totalResults = data.totalResults;

  // Kiểm tra độ dài từ khóa
  if (query.length < 2) {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <Search className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                Nhập từ khóa để bắt đầu tìm kiếm.
            </h1>
            <p className="text-gray-500 mt-2">Từ khóa cần tối thiểu 2 ký tự.</p>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Tiêu đề kết quả */}
      <div className="mb-8 border-b pb-4 dark:border-gray-800">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">
          Kết quả tìm kiếm cho: 
          <span className="text-blue-600 ml-2">&ldquo;{query}&rdquo;</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Tìm thấy **{totalResults}** truyện phù hợp.
        </p>
      </div>

      {/* Kết quả tìm kiếm */}
      {totalResults > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {data.results.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800">
            <Search className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <p className="text-xl font-semibold text-red-500">
                Rất tiếc, không tìm thấy truyện nào.
            </p>
            <p className="text-gray-500 mt-2">
                Hãy thử lại với từ khóa khác hoặc quay lại <Link href="/" className="text-blue-500 hover:underline">Trang chủ</Link>.
            </p>
        </div>
      )}
    </div>
  );
}