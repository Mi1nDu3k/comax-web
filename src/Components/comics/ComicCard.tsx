// src/components/comics/ComicCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { ComicBasic } from '@/Data/homeMock';

export default function ComicCard({ comic }: { comic: ComicBasic }) {
  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
      
      {/* 1. Image Cover */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={`/comic/${comic.slug}`}>
          <Image
            src={comic.cover}
            alt={comic.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized={true} // Bắt buộc cho placehold.co SVG
          />
          
          {/* Hot Badge */}
          {comic.isHot && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
              HOT
            </span>
          )}

          {/* Overlay Rating */}
          <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-2 py-1 rounded-tl-lg flex items-center gap-1">
             <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {comic.rating}
          </div>
        </Link>
      </div>

      {/* 2. Content */}
      <div className="p-3 flex flex-col flex-grow">
        <Link 
          href={`/comic/${comic.slug}`}
          className="font-bold text-gray-800 dark:text-gray-100 line-clamp-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 mb-2 transition"
          title={comic.title}
        >
          {comic.title}
        </Link>

        <div className="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {comic.latestChapter}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {comic.updatedAt}
          </div>
        </div>
      </div>
    </div>
  );
}