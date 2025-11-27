// src/components/comics/ActionButtons.tsx
'use client';

import Link from 'next/link';
import { BookOpen, Bookmark, Clock } from 'lucide-react';

interface ActionButtonsProps {
    slug: string; // Slug truyện
    firstChapterSlug: string; // Slug chương đầu tiên
    latestChapterSlug: string; // Slug chương mới nhất
}

export default function ActionButtons({ slug, firstChapterSlug, latestChapterSlug }: ActionButtonsProps) {
    
    // Đường dẫn đọc truyện sẽ là: /read/[slug]/[chapterSlug]
    const readFromStartUrl = `/read/${slug}/${firstChapterSlug}`;
    const readLatestUrl = `/read/${slug}/${latestChapterSlug}`;

    return (
        <div className="flex gap-4 mt-6">
            
            {/* Nút Đọc Chương Mới Nhất (Primary) */}
            <Link href={readLatestUrl} passHref>
                <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-[1.02]">
                    <Clock className="w-5 h-5" />
                    Đọc Chương Mới
                </button>
            </Link>

            {/* Nút Đọc Từ Đầu (Secondary) */}
            <Link href={readFromStartUrl} passHref>
                 <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition">
                    <BookOpen className="w-5 h-5" />
                    Đọc Từ Đầu
                </button>
            </Link>

            {/* Nút Theo Dõi (Tertiary) */}
            <button className="flex items-center gap-2 p-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 transition">
                <Bookmark className="w-5 h-5" />
                Theo Dõi
            </button>
        </div>
    );
}