// src/data/homeMock.ts

export interface ComicBasic {
  id: number;
  title: string;
  slug: string;
  cover: string;
  latestChapter: string;
  updatedAt: string;    
  rating?: number;
  viewCount?: string;
  isHot?: boolean;
}

export interface HomeData {
  featured: ComicBasic[];
  latest: ComicBasic[];
  ranking: ComicBasic[];
}

// Hàm giả lập API
export async function getHomeData(): Promise<HomeData> {
  // Giả lập delay mạng
  await new Promise((resolve) => setTimeout(resolve, 500));

  const generateComics = (count: number, prefix: string): ComicBasic[] => 
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      title: `${prefix} Comic Title ${i + 1} - Name can be long`,
      slug: `comic-demo-${i + 1}`,
      // Sử dụng placehold.co để tạo ảnh giả (Tỉ lệ 3:4 chuẩn truyện tranh)
      cover: `https://placehold.co/300x400/1e293b/FFF?text=${prefix}+${i+1}`,
      latestChapter: `Chapter ${100 + i}`,
      updatedAt: `${i + 1} giờ trước`,
      rating: 4.5,
      viewCount: '120K',
      isHot: i < 3,
    }));

  return {
    featured: generateComics(9, 'Hot'),
    latest: generateComics(24, 'New'),
    ranking: generateComics(10, 'Top'),
  };
}