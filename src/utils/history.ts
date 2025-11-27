
export interface HistoryItem {
  id: string;
  title: string;
  chapterSlug: string;
  chapterTitle: string;
  cover: string;
  readAt: number;
}

const HISTORY_KEY = 'comax_history';
export const getHistory = (): HistoryItem[] => {
  if (typeof window === 'undefined') return [];
  const json = localStorage.getItem(HISTORY_KEY);
  // Quan trọng: Phải return mảng rỗng [] nếu không có dữ liệu
  return json ? JSON.parse(json) : [];
};

export const addToHistory = (item: Omit<HistoryItem, 'readAt'>) => {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const filtered = history.filter(h => h.id !== item.id);
  const newItem: HistoryItem = { ...item, readAt: Date.now() };
  const newHistory = [newItem, ...filtered].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
};

export const removeFromHistory = (comicSlug: string) => {
  const history = getHistory();
  const newHistory = history.filter(h => h.id !== comicSlug);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  return newHistory;
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};