// src/services/comic.service.ts
import { fetchClient } from '@/lib/api-client';
import { HomeData } from '@/Data/homeMock'; 
import { ComicDetailDto } from '@/Data/detailMock';

// API: GET /api/home
export async function getComicDetail(slug: string) {
  GetbyId(int id)
  return fetchClient<ComicDetailDto>(`/Comics/${slug}`);
}

// API: GET /api/comics/{slug}
export async function getComicDetail(slug: string): Promise<ComicDetailDto> {
  return fetchClient<ComicDetailDto>(`/comics/${slug}`, {
    cache: 'no-store' // Luôn lấy dữ liệu mới nhất (SSR)
  });
}

// API: GET /api/genres/{slug}
export async function getComicsByGenre(slug: string, page: number) {
  return fetchClient<any>(`/genres/${slug}?page=${page}`);
}