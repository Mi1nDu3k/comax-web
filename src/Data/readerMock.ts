// src/data/readerMock.ts

export interface ReaderChapterDto {
    comicTitle: string;
    chapterTitle: string; // Tên chương đang đọc
    comicSlug: string;
    chapterSlug: string;
    
    // Danh sách URL ảnh của chương
    imageUrls: string[]; 
    
    // Dữ liệu cho thanh điều hướng
    prevChapterSlug: string | null;
    nextChapterSlug: string | null;
}

export async function getReaderChapter(
    comicSlug: string, 
    chapterSlug: string
): Promise<ReaderChapterDto | null> {
    
    await new Promise(resolve => setTimeout(resolve, 500)); 

    // Lấy số chương từ chapterSlug (VD: chapter-10 -> 10)
    const chapterNumberMatch = chapterSlug.match(/\d+/);
    const chapterNumber = chapterNumberMatch ? parseInt(chapterNumberMatch[0], 10) : 1;
    
    // Giả lập 20 ảnh cho mỗi chương
    const imageUrls = Array.from({ length: 20 }, (_, i) => 
        `https://placehold.co/800x1200/0f172a/FFF?text=Page+${i + 1}\n(Chapter+${chapterNumber})`
    );

    // Giả lập chương trước và chương sau (chỉ có 50 chương tổng cộng)
    const prevChapterNumber = chapterNumber > 1 ? chapterNumber - 1 : null;
    const nextChapterNumber = chapterNumber < 50 ? chapterNumber + 1 : null;
    
    return {
        comicTitle: comicSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        chapterTitle: `Chapter ${chapterNumber}`,
        comicSlug: comicSlug,
        chapterSlug: chapterSlug,
        imageUrls: imageUrls,
        
        // Điều hướng
        prevChapterSlug: prevChapterNumber ? `chapter-${prevChapterNumber}` : null,
        nextChapterSlug: nextChapterNumber ? `chapter-${nextChapterNumber}` : null,
    };
}