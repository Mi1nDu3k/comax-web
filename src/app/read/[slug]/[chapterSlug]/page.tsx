// src/app/read/[slug]/[chapterSlug]/page.tsx

import { getReaderChapter } from '@/Data/readerMock';
import ReaderHeader from '@/Components/reader/ReaderHeader';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import HistoryTracker from '@/Components/reader/HistoryTracker';

interface ReaderPageProps {
    params: Promise<{ slug: string; chapterSlug: string }>;
}

export const metadata = {
    title: 'Đọc truyện - Comax Web',
};

export default async function ReaderPage(props: ReaderPageProps) {
    // 1. Giải quyết params (Next.js 15+)
    const params = await props.params;
    const { slug, chapterSlug } = params;
    
    // 2. Fetch dữ liệu chương (Server Side)
    // Lưu ý: Đảm bảo hàm getReaderChapter trong mock của bạn nhận đúng tham số
    const chapterData = await getReaderChapter(slug, chapterSlug); 

    // 3. Xử lý 404 nếu không có dữ liệu
    if (!chapterData) {
        return notFound();
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-950 min-h-screen">
            
            {/* --- COMPONENT LƯU LỊCH SỬ (Client Side) --- */}
            <HistoryTracker 
                data={{
                    comicSlug: slug,
                    comicTitle: chapterData.comicTitle,
                    chapterSlug: chapterData.chapterSlug,
                    chapterTitle: chapterData.chapterTitle,
                    coverPlaceholder: `https://placehold.co/300x400/1e293b/FFF?text=${slug.charAt(0).toUpperCase()}`
                }}
            />
            {/* ------------------------------------------- */}

            {/* Header điều hướng */}
            <ReaderHeader 
                comicTitle={chapterData.comicTitle}
                chapterTitle={chapterData.chapterTitle}
                comicSlug={slug}
                prevChapterSlug={chapterData.prevChapterSlug}
                nextChapterSlug={chapterData.nextChapterSlug}
            />

            {/* Content ảnh truyện */}
            <main className="pt-20 pb-4"> 
                {chapterData.imageUrls.map((imageUrl, index) => (
                    <div key={index} className="flex justify-center w-full my-1">
                        <Image
                            src={imageUrl}
                            alt={`${chapterData.chapterTitle} - Page ${index + 1}`}
                            width={800} 
                            height={1200}
                            className="w-full max-w-4xl h-auto shadow-xl"
                            unoptimized={true} 
                            priority={index < 3} 
                        />
                    </div>
                ))}
            </main>
        </div>
    );
}