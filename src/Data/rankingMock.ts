import { ComicBasic } from './homeMock'; // Tái sử dụng interface cơ bản

export interface RankedComic extends ComicBasic {
    rank: number;
    dailyViews: number;
}

export interface RankingData {
    daily: RankedComic[];
    weekly: RankedComic[];
    monthly: RankedComic[];
}

const generateRankedList = (count: number, type: string): RankedComic[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i + 1,
        title: `${type} Rank Comic #${i + 1}`,
        slug: `rank-${type.toLowerCase()}-${i + 1}`,
        cover: `https://placehold.co/150x200/0f172a/FFF?text=Rank+${i + 1}`,
        latestChapter: `Ch. ${200 - i}`,
        updatedAt: '1 ngày trước',
        rating: 5.0 - (i / 10),
        rank: i + 1,
        dailyViews: (50000 - (i * 100)) * (type === 'Daily' ? 1 : type === 'Weekly' ? 7 : 30),
    }));
};

export async function getRankingData(): Promise<RankingData> {
    // Giả lập delay mạng
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        daily: generateRankedList(10, 'Daily'),
        weekly: generateRankedList(10, 'Weekly'),
        monthly: generateRankedList(10, 'Monthly'),
    };
}