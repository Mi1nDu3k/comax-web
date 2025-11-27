// src/data/genreMock.ts
import { ComicBasic } from './homeMock'; // Tái sử dụng interface từ trang chủ

export interface GenreResult {
  genreName: string;
  comics: ComicBasic[];
  currentPage: number;
  totalPages: number;
}

const ALL_GENRES = [
  { id: 'all', name: 'Tất cả' },
  { id: 'action', name: 'Hành động' },
  { id: 'romance', name: 'Tình cảm' },
  { id: 'horror', name: 'Kinh dị' },
  { id: 'comedy', name: 'Hài hước' },
  { id: 'fantasy', name: 'Giả tưởng' },
  { id: 'sci-fi', name: 'Khoa học viễn tưởng' },
  { id: 'adventure', name: 'Phiêu lưu' },
  { id: 'drama', name: 'Chính kịch' },
  { id: 'mystery', name: 'Bí ẩn' },
  { id: 'slice-of-life', name: 'Cuộc sống' },
  { id: 'supernatural', name: 'Siêu nhiên' },
{ id: 'thriller', name: 'Kịch tính' },
{ id: 'historical', name: 'Lịch sử' },
{ id: 'sports', name: 'Thể thao' },
{ id: 'mecha', name: 'Cơ khí' },
{ id: 'isekai', name: 'Isekai' },
{ id: 'school-life', name: 'Học đường' },
{ id: 'yaoi', name: 'Yaoi' },
{ id: 'yuri', name: 'Yuri' },
{ id: 'shounen', name: 'Shounen' },
{ id: 'shoujo', name: 'Shoujo' },


];

export async function getComicsByGenre(slug: string, page: number = 1): Promise<GenreResult> {
  // Giả lập delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const pageSize = 12; // Số truyện mỗi trang
  const totalComics = 60; // Giả lập tổng 60 truyện

  // 1. Tạo danh sách truyện giả lập
  const genreName = ALL_GENRES.find(g => g.id === slug)?.name || 'Thể loại khác';
  
  const comics: ComicBasic[] = Array.from({ length: pageSize }).map((_, i) => {
    const globalIndex = (page - 1) * pageSize + i + 1;
    return {
      id: globalIndex,
      title: `${genreName} Comic #${globalIndex}`,
      slug: `comic-genre-${globalIndex}`,
      cover: `https://placehold.co/300x450/1e293b/FFF?text=${slug.toUpperCase()}+${globalIndex}`,
      latestChapter: `Chapter ${100 + globalIndex}`,
      updatedAt: '1 ngày trước',
      rating: 4.5,
      isHot: false,
    };
  });

  return {
    genreName: genreName,
    comics: comics,
    currentPage: page,
    totalPages: Math.ceil(totalComics / pageSize),
  };
}

// Hàm lấy danh sách các thể loại để hiển thị menu (Sidebar)
export function getAllGenres() {
  return ALL_GENRES;
}