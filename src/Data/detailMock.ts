
export interface ChapterItem {
    id: number;
    title: string;
    slug: string; // Slug chương, VD: 'chapter-10'
    publishedAt: string; // Ngày cập nhật
}

export interface ComicDetailDto {
    id: number;
    title: string;
    slug: string;
    cover: string;
    author: string;
    status: 'Đang tiến hành' | 'Hoàn thành' | 'Tạm ngưng';
    genres: string[];
    rating: number; // 4.5
    viewCount: string; // 1.2M
    description: string;
    chapters: ChapterItem[];
}

export async function getComicDetail(slug: string): Promise<ComicDetailDto | null> {
    // Giả lập delay mạng
    await new Promise(resolve => setTimeout(resolve, 500));

    // Giả lập kiểm tra slug hợp lệ
    if (slug === 'comic-demo-not-found') {
        return null;
    }

    const mockDescription = `Đây là phần mô tả chi tiết của bộ truyện ${slug}. Bộ truyện kể về hành trình của nhân vật chính khám phá thế giới phép thuật, chiến đấu với các thế lực tà ác và tìm kiếm sự thật về nguồn gốc sức mạnh của mình. Mặc dù gặp nhiều khó khăn, anh ta luôn giữ vững tinh thần lạc quan và sự kiên trì.`;

    const chapters: ChapterItem[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Chapter ${i + 1}: Cuộc phiêu lưu bắt đầu`,
        slug: `chapter-${i + 1}`,
        publishedAt: new Date(Date.now() - (i * 86400000)).toISOString().split('T')[0], // Giả lập ngày cập nhật
    }));

    return {
        id: 105,
        title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        slug: slug,
        cover: `https://placehold.co/400x550/0f172a/FFF?text=${slug.toUpperCase()}`,
        author: 'Tác giả Giả Lập',
        status: 'Đang tiến hành',
        genres: ['Action', 'Fantasy', 'Adventure'],
        rating: 4.8,
        viewCount: '1.5M',
        description: mockDescription,
        chapters: chapters.reverse(), // Chapter mới nhất nằm ở cuối array (ID lớn hơn)
    };
}