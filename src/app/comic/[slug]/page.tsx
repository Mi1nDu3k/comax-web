import { getComicDetail, ChapterItem } from '@/data/detailMock';
import Image from 'next/image';
import Link from 'next/link';
import { User, BookOpen, Clock, Zap, Star } from 'lucide-react';
import { notFound } from 'next/navigation';
import ActionButtons from '@/components/comics/ActionButtons';


interface ComicDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Component hiển thị từng mục Chương trong danh sách
function ChapterListItem({ chapter, comicSlug }: { chapter: ChapterItem, comicSlug: string }) {
    // Định dạng ngày
    const date = new Date(chapter.publishedAt).toLocaleDateString('vi-VN');

    return (
        // Link đến trang đọc truyện: /read/[comicSlug]/[chapterSlug]
        <Link href={`/read/${comicSlug}/${chapter.slug}`}>
            <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <span className="font-medium text-slate-800 dark:text-slate-100 hover:text-blue-600">
                    {chapter.title}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                    {date}
                </span>
            </div>
        </Link>
    );
}


export default async function ComicDetailPage(props: ComicDetailPageProps) {
    
    const params = await props.params;
    const comicSlug = params.slug;
    
    // Fetch dữ liệu trên Server
    const comic = await getComicDetail(comicSlug);

    // Xử lý không tìm thấy truyện
    if (!comic) {
        return notFound();
    }
    
    
    const latestChapter = comic.chapters[0]; 
    
    const firstChapter = comic.chapters[comic.chapters.length - 1]; 

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                {comic.title}
            </h1>

            {/* --- TOP SECTION: IMAGE, METADATA & BUTTONS --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border dark:border-gray-800">
                
                {/* 1. Cover Image */}
                <div className="md:col-span-1 relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                    <Image 
                        src={comic.cover} 
                        alt={comic.title} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 30vw"
                        unoptimized={true} 
                    />
                </div>
                
                {/* 2. Metadata and Action */}
                <div className="md:col-span-3">
                    
                    <div className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
                        {/* Status */}
                        <div className="flex items-center gap-2">
                             <Zap className="w-5 h-5 text-red-500" /> 
                             <span className="font-semibold text-lg">{comic.status}</span>
                        </div>
                        
                        {/* Author */}
                        <div className="flex items-center gap-2">
                             <User className="w-5 h-5" /> 
                             <span>**Tác giả:** {comic.author}</span>
                        </div>
                        
                        {/* Genres */}
                        <div className="flex items-center gap-2">
                             <BookOpen className="w-5 h-5" /> 
                             <span>**Thể loại:** {comic.genres.join(', ')}</span>
                        </div>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                             <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" /> 
                             <span>**Đánh giá:** {comic.rating} ({comic.viewCount} Lượt xem)</span>
                        </div>
                        
                        {/* Latest Chapter */}
                        <div className="flex items-center gap-2">
                             <Clock className="w-5 h-5 text-blue-500" /> 
                             <span>**Chương mới nhất:** {latestChapter.title}</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <ActionButtons 
                        slug={comicSlug}
                        firstChapterSlug={firstChapter.slug} 
                        latestChapterSlug={latestChapter.slug}
                    />
                </div>
            </div>

            {/* --- BOTTOM SECTION: DESCRIPTION & CHAPTER LIST --- */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. Description (1 Column) */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border dark:border-gray-800">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2">
                        Tóm tắt
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                        {comic.description}
                    </p>
                </div>
                
                {/* 2. Chapter List (2 Columns) */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg border dark:border-gray-800">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white p-4 border-b dark:border-gray-700">
                        Danh sách Chương ({comic.chapters.length})
                    </h3>
                    <div className="max-h-[500px] overflow-y-auto">
                        {comic.chapters.map(chapter => (
                            <ChapterListItem 
                                key={chapter.id} 
                                chapter={chapter} 
                                comicSlug={comicSlug} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}