// src/data/searchMock.ts
import { ComicBasic } from './homeMock'; // Tái sử dụng interface

export interface SearchResult {
    query: string;
    totalResults: number;
    results: ComicBasic[];
}

export async function searchComics(query: string): Promise<SearchResult> {
    // Giả lập delay mạng
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query || query.length < 2) {
        return {
            query: query,
            totalResults: 0,
            results: [],
        };
    }

    const normalizedQuery = query.toLowerCase();
    const mockResults: ComicBasic[] = [];
    const totalCount = Math.floor(Math.random() * 20) + 5; // 5 đến 25 kết quả giả lập

    for (let i = 0; i < totalCount; i++) {
        // Tạo tên truyện giả lập dựa trên từ khóa
        const title = `${normalizedQuery.toUpperCase()} Adventure ${i + 1}`;
        mockResults.push({
            id: i,
            title: title,
            slug: `${normalizedQuery}-adventure-${i + 1}`,
            cover: `https://placehold.co/300x400/374151/FFF?text=Search+${i + 1}`,
            latestChapter: `Chapter ${100 + i}`,
            updatedAt: `${i % 5 + 1} giờ trước`,
            rating: 4.5,
            isHot: i < 3,
        });
    }

    return {
        query: query,
        totalResults: totalCount,
        results: mockResults,
    };
}