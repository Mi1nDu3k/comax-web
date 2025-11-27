export interface UserAdmin {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'banned';
  joinedAt: string;
  isVip : boolean;
}

export interface ComicAdmin {
  id: number;
  title: string;
  author: string;
  status: 'ongoing' | 'completed' | 'dropped';
  chapters: number;
  views: number;
  updatedAt: string;
}

export const MOCK_USERS: UserAdmin[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  username: `user_demo_${i + 1}`,
  email: `user${i + 1}comax.com`,
  role: i === 0 ? 'admin' : 'user',
  status: i % 4 === 0 ? 'banned' : 'active',
  joinedAt: '2024-01-15',
  isVip: i % 3 === 0 ? true : false,
 
}));

export const MOCK_COMICS: ComicAdmin[] = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 100,
  title: `Solo Leveling ${i + 1}`,
  author: 'Chu-Gong',
  status: i % 3 === 0 ? 'completed' : 'ongoing',
  chapters: 150 + i,
  views: 12000 + i * 100,
  updatedAt: '2 giờ trước',
}));