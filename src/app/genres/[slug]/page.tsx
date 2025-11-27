// src/app/genres/[slug]/page.tsx
import { getComicsByGenre, getAllGenres } from '@/data/genreMock';
import ComicCard from '@/components/comics/ComicCard';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { promises } from 'dns';

// Định nghĩa Props cho Page (Next.js 14+)
interface GenrePageProps {
  params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export default async function GenrePage(props: GenrePageProps) {
 const params = await props.params;
    const searchParams = await props.searchParams;

    const slug = params.slug;
    const page = Number(searchParams?.page) || 1;

  if (!slug) return notFound();

  // 2. Fetch dữ liệu
  const data = await getComicsByGenre(slug, page);
  const allGenres = getAllGenres();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* --- SIDEBAR: DANH SÁCH THỂ LOẠI --- */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border dark:border-gray-800 sticky top-20">
            <h3 className="font-bold text-lg mb-4 border-b pb-2 dark:border-gray-700">Thể Loại</h3>
            <ul className="space-y-2">
              {allGenres.map((g) => (
                <li key={g.id}>
                  <Link 
                    href={`/genres/${g.id}`}
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      slug === g.id 
                        ? 'bg-blue-600 text-white font-bold' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* --- MAIN CONTENT: DANH SÁCH TRUYỆN --- */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-blue-600">#</span> 
            Truyện {data.genreName}
          </h1>

          {/* Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.comics.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>

          {/* Phân trang */}
          <Pagination totalPages={data.totalPages} />
        </main>

      </div>
    </div>
  );
}