// src/components/ranking/RankingClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RankedComic, RankingData } from '@/data/rankingMock';
import { TrendingUp, Eye } from 'lucide-react';

type RankType = 'daily' | 'weekly' | 'monthly';

interface RankingClientProps {
    initialData: RankingData;
}

// Component hiển thị từng mục trong danh sách xếp hạng
const RankItem = ({ comic }: { comic: RankedComic }) => {
    
    // Hàm format view
    const formatViews = (views: number) => {
        if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M';
        if (views >= 1000) return (views / 1000).toFixed(1) + 'K';
        return views.toString();
    };

    // Style cho Top 3
    const rankStyle = 
        comic.rank === 1 ? 'bg-yellow-500 text-gray-900 shadow-lg' :
        comic.rank === 2 ? 'bg-gray-400 text-white' :
        comic.rank === 3 ? 'bg-amber-700 text-white' :
        'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';

    return (
        <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition">
            
            {/* 1. Rank Number */}
            <div className={`w-8 h-8 flex items-center justify-center font-extrabold rounded-full flex-shrink-0 ${rankStyle}`}>
                {comic.rank}
            </div>

            {/* 2. Image Cover */}
            <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
                <Image 
                    src={comic.cover} 
                    alt={comic.title} 
                    fill 
                    className="object-cover" 
                    unoptimized={true} 
                />
            </div>

            {/* 3. Info */}
            <div className="flex-grow min-w-0">
                <Link href={`/comic/${comic.slug}`} className="font-semibold text-base line-clamp-2 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition">
                    {comic.title}
                </Link>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <span>{comic.latestChapter}</span>
                    <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" /> {formatViews(comic.dailyViews)}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default function RankingClient({ initialData }: RankingClientProps) {
    const [activeTab, setActiveTab] = useState<RankType>('daily');
    
    const displayedComics = initialData[activeTab];
    const tabName = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border dark:border-gray-800">
            
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
                <TrendingUp className="w-7 h-7 text-green-600" /> Bảng Xếp Hạng
            </h1>

            {/* Tabs Điều hướng */}
            <div className="flex border-b dark:border-gray-700 mb-6">
                {['daily', 'weekly', 'monthly'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as RankType)}
                        className={`px-4 py-2 text-sm font-semibold transition-colors ${
                            activeTab === tab 
                                ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                    >
                        {tab === 'daily' ? 'Ngày' : tab === 'weekly' ? 'Tuần' : 'Tháng'}
                    </button>
                ))}
            </div>

            {/* Danh sách Xếp hạng */}
            <div className="space-y-3">
                {displayedComics.map((comic) => (
                    <RankItem key={comic.id} comic={comic} />
                ))}
            </div>

        </div>
    );
}