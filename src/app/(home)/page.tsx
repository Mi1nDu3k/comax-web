// src/app/(home)/page.tsx
import { getHomeData } from '@/data/homeMock';
import ComicCard from '../../components/comics/ComicCard';
import Link from 'next/link';
import { Flame, ChevronRight, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';
import FeaturedSlider from '@/components/comics/FeaturedSlider';

export default async function HomePage() {
  // Fetch data (Server Side)
  const { featured, latest, ranking } = await getHomeData();

  return (
    <div className="container mx-auto px-4 py-6 space-y-10">

      {/* === SECTION 1: HERO / FEATURED (Truyện Đề Cử) === */}
 {/* === SECTION 1: HERO / FEATURED (Truyện Đề Cử) - Dùng Slider === */}
      <section className="p-6 rounded-xl shadow-lg border dark:border-slate-800 bg-gray-50 dark:bg-gray-900">
         <div className="flex items-center gap-2 mb-4">
            <Flame className="w-6 h-6 text-red-600 fill-red-600" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Truyện Đề Cử</h2>
        </div>
        
        {/* 👈 Thay thế Grid bằng FeaturedSlider */}
        <FeaturedSlider comics={featured} />
        {/* ----------------------------------- */}
      </section>

      {/* === SECTION 2: MAIN CONTENT & SIDEBAR === */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: LATEST UPDATES (8 Columns) --- */}
        <div className="lg:col-span-8">
            <div className="flex justify-between items-end mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> Mới Cập Nhật
                </h2>
                <Link href="/genres/all" className="text-sm text-gray-500 hover:text-blue-500 flex items-center">
                    Xem tất cả <ChevronRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {latest.map((comic) => (
                    <ComicCard key={comic.id} comic={comic} />
                ))}
            </div>
            
            {/* Pagination Mock */}
            <div className="mt-8 flex justify-center gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300">2</button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300">...</button>
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300">Cuối</button>
            </div>
        </div>

        {/* --- RIGHT: SIDEBAR / RANKING (4 Columns) --- */}
        <div className="lg:col-span-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border dark:border-gray-800 sticky top-4">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" /> Bảng Xếp Hạng
                </h2>
                
                <div className="flex flex-col gap-4">
                    {ranking.map((comic, index) => (
                        <div key={comic.id} className="flex gap-3 group cursor-pointer border-b border-dashed border-gray-200 dark:border-gray-800 pb-3 last:border-0">
                            {/* Rank Number */}
                            <div className={`text-2xl font-bold w-8 text-center flex-shrink-0 ${
                                index === 0 ? 'text-red-500' : 
                                index === 1 ? 'text-green-500' : 
                                index === 2 ? 'text-blue-500' : 'text-gray-400'
                            }`}>
                                {index + 1}
                            </div>
                            
                            {/* Tiny Cover */}
                            <div className="relative w-12 h-16 flex-shrink-0 rounded overflow-hidden">
                                <Image src={comic.cover} alt={comic.title} fill className="object-cover" unoptimized={true} />
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-center overflow-hidden">
                                <Link href={`/comic/${comic.slug}`} className="font-semibold text-sm text-gray-800 dark:text-gray-200 truncate group-hover:text-blue-500 transition">
                                    {comic.title}
                                </Link>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{comic.latestChapter}</span>
                                    <span>{comic.viewCount} views</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}