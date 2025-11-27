// src/components/reader/HistoryTracker.tsx
'use client';

import { useEffect } from 'react';
import { addToHistory } from '@/utils/history';

interface HistoryTrackerProps {
  data: {
    comicSlug: string;
    comicTitle: string;
    chapterSlug: string;
    chapterTitle: string;
    coverPlaceholder: string;
  };
}

export default function HistoryTracker({ data }: HistoryTrackerProps) {
  useEffect(() => {
    // Chỉ chạy trên trình duyệt (Client Side)
    addToHistory({
      id: data.comicSlug,
      title: data.comicTitle,
      chapterSlug: data.chapterSlug,
      chapterTitle: data.chapterTitle,
      cover: data.coverPlaceholder,
    });
  }, [data]); // Chạy lại khi data thay đổi

  return null; // Component này không hiển thị giao diện gì cả
}