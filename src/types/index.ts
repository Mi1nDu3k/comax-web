export interface Comic {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  description?: string;
  latestChapter?: string;
  rating?: number;
}

export interface Chapter {
  id: number;
  title: string;
  slug: string; // e.g., 'chapter-1'
  comicSlug: string;
  images: string[]; // Danh sách URL ảnh
}