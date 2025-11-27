// src/components/reader/ReaderHeader.tsx
'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ReaderHeaderProps {
    comicTitle: string;
    chapterTitle: string;
    comicSlug: string;
    prevChapterSlug: string | null;
    nextChapterSlug: string | null;
}

export default function ReaderHeader({ 
    comicTitle, 
    chapterTitle, 
    comicSlug, 
    prevChapterSlug, 
    nextChapterSlug 
}: ReaderHeaderProps) {
    
    const router = useRouter();
    
    // Tạo URL chương trước/sau
    const prevChapterUrl = prevChapterSlug ? `/read/${comicSlug}/${prevChapterSlug}` : null;
    const nextChapterUrl = nextChapterSlug ? `/read/${comicSlug}/${nextChapterSlug}` : null;

    return (
        // Header cố định (Fixed) trên cùng màn hình
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 shadow-xl text-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                
                {/* 1. Nút Quay Lại Trang Chi Tiết */}
                <Link href={`/comic/${comicSlug}`} className="flex items-center gap-2 hover:text-blue-400 transition">
                    <BookOpen className="w-5 h-5" />
                    <span className="hidden sm:inline font-semibold truncate max-w-[150px]">{comicTitle}</span>
                </Link>

                {/* 2. Điều hướng Chương */}
                <div className="flex items-center gap-4">
                    
                    {/* Nút Chương Trước */}
                    <button 
                        onClick={() => prevChapterUrl && router.push(prevChapterUrl)}
                        disabled={!prevChapterSlug}
                        className={`p-2 rounded-full transition ${
                            prevChapterSlug 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-700/50 cursor-not-allowed'
                        }`}
                        aria-label="Previous Chapter"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {/* Tên Chương Hiện Tại */}
                    <h1 className="text-lg font-bold truncate max-w-[200px]">{chapterTitle}</h1>
                    
                    {/* Nút Chương Sau */}
                    <button 
                         onClick={() => nextChapterUrl && router.push(nextChapterUrl)}
                         disabled={!nextChapterSlug}
                         className={`p-2 rounded-full transition ${
                            nextChapterSlug 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-700/50 cursor-not-allowed'
                        }`}
                        aria-label="Next Chapter"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                
                {/* 3. Nút Quay Lại Trang Chủ */}
                <Link href="/" className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition" aria-label="Go to Homepage">
                    <Home className="w-5 h-5" />
                </Link>
            </div>
        </header>
    );
}