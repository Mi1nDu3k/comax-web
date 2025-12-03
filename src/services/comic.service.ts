// src/services/comic.service.ts
import { fetchClient } from '@/lib/api-client';

// 1. Định nghĩa Interface khớp với DTO của Backend .NET
export interface ComicDto {
  id: number;
  title: string;
  slug: string;
  coverImage: string; // Hoặc 'coverUrl' tùy backend
  author: string;
  status: string;
  description: string;
  viewCount: number;
  rating: number;
  updatedAt: string;
  latestChapter?: string;
}

export interface ChapterDto {
  id: number;
  title: string;
  slug: string;
  publishedAt: string;
  images?: string[]; // Danh sách ảnh (cho trang đọc)
}

export interface ComicDetailDto extends ComicDto {
  chapters: ChapterDto[];
}

// 2. Các hàm gọi API

// Lấy danh sách truyện (cho trang chủ)
// GET /api/comics
export async function getComics(params?: { page?: number; limit?: number; isVip?: boolean }) {
  const queryString = new URLSearchParams(params as any).toString();
  return fetchClient<ComicDto[]>(`/Comics?${queryString}`, {
    next: { revalidate: 60 } // Cache 60s
  });
}

// Lấy chi tiết truyện
// GET /api/comics/{slug}
export async function getComicBySlug(slug: string) {
  return fetchClient<ComicDetailDto>(`/Comics/${slug}`, {
    cache: 'no-store' // Luôn lấy mới nhất
  });
}

// Lấy chi tiết chương (để đọc)
// GET /api/chapters/{id} hoặc /api/comics/{slug}/{chapterSlug}
export async function getChapterContent(chapterId: number) {
  return fetchClient<ChapterDto>(`/Chapters/${chapterId}`);
}

// Tìm kiếm
// GET /api/comics/search?q=...
export async function searchComics(query: string) {
  return fetchClient<ComicDto[]>(`/Comics/search?q=${encodeURIComponent(query)}`);
}