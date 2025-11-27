// src/app/ranking/page.tsx (SERVER COMPONENT)

import { getRankingData } from '@/data/rankingMock';
import RankingClient from '@/components/Ranking/RankingClient';

export const metadata = {
    title: 'Bảng Xếp Hạng - Comax Web',
};

export default async function RankingPage() {
    
    // Fetch dữ liệu xếp hạng trên Server
    const rankingData = await getRankingData();

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Truyền dữ liệu xuống Client Component */}
            <RankingClient initialData={rankingData} />
        </div>
    );
}