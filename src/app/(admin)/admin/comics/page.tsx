'use client';

import { useState } from 'react';
import AdminHeader from '@/Components/admin/AdminHeader'; // Sửa lại casing import cho đúng chuẩn
import { MOCK_COMICS, ComicAdmin } from '@/Data/adminMock'; // Sửa lại casing import cho đúng chuẩn
import { Trash2, Edit, Plus, Eye, RefreshCw } from 'lucide-react';

export default function AdminComicsPage() {
  const [comics, setComics] = useState<ComicAdmin[]>(MOCK_COMICS);
  // 1. State lưu trạng thái lọc hiện tại
  const [filterStatus, setFilterStatus] = useState<'all' | 'ongoing' | 'completed' | 'dropped'>('all');

  // 2. Chức năng Xóa Truyện
  const handleDelete = (id: number) => {
    if (confirm('CẢNH BÁO: Hành động này sẽ xóa truyện khỏi hệ thống. Bạn có chắc không?')) {
      setComics(comics.filter(c => c.id !== id));
    }
  };

  // 3. Chức năng Đổi Trạng thái (Cycle: Ongoing -> Completed -> Dropped -> Ongoing)
  const toggleStatus = (id: number) => {
    setComics(comics.map(comic => {
      if (comic.id === id) {
        let nextStatus: ComicAdmin['status'] = 'ongoing';
        if (comic.status === 'ongoing') nextStatus = 'completed';
        else if (comic.status === 'completed') nextStatus = 'dropped';
        // else if dropped -> quay về ongoing
        
        return { ...comic, status: nextStatus };
      }
      return comic;
    }));
  };

  // 4. Logic Lọc danh sách truyện hiển thị
  const filteredComics = comics.filter(comic => {
    if (filterStatus === 'all') return true;
    return comic.status === filterStatus;
  });

  // Helper để hiển thị text và màu sắc badge
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed': return { label: 'Hoàn thành', style: 'bg-green-100 text-green-700 border-green-200' };
      case 'ongoing': return { label: 'Đang tiến hành', style: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'dropped': return { label: 'Tạm ngưng', style: 'bg-red-100 text-red-700 border-red-200' };
      default: return { label: 'Unknown', style: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <>
      <AdminHeader title="Quản lý Truyện Tranh" />
      <main className="p-8">
        
        {/* --- TOOLBAR & FILTER BUTTONS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
             {/* Nút Lọc Tất Cả */}
             <button 
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    filterStatus === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
             >
                Tất cả
             </button>
             
             {/* Nút Lọc Đang Tiến Hành */}
             <button 
                onClick={() => setFilterStatus('ongoing')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    filterStatus === 'ongoing' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
             >
                Đang tiến hành
             </button>

             {/* Nút Lọc Hoàn Thành */}
             <button 
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    filterStatus === 'completed' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
             >
                Hoàn thành
             </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
            <Plus className="w-4 h-4" /> Thêm Truyện
          </button>
        </div>

        {/* --- TABLE --- */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4 w-16">#ID</th>
                <th className="px-6 py-4">Tên Truyện</th>
                <th className="px-6 py-4">Trạng thái (Click để đổi)</th>
                <th className="px-6 py-4">Chương</th>
                <th className="px-6 py-4">Lượt xem</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800 text-sm">
              {filteredComics.length > 0 ? (
                  filteredComics.map((comic) => {
                    const statusConfig = getStatusConfig(comic.status);
                    return (
                        <tr key={comic.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                        <td className="px-6 py-4 text-gray-400 font-mono">{comic.id}</td>
                        <td className="px-6 py-4">
                            <p className="font-bold text-gray-800 dark:text-white text-base">{comic.title}</p>
                            <p className="text-gray-500 text-xs">Tác giả: {comic.author}</p>
                        </td>
                        
                        {/* Cột Trạng thái có chức năng Click */}
                        <td className="px-6 py-4">
                            <button 
                                onClick={() => toggleStatus(comic.id)}
                                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 transition transform active:scale-95 ${statusConfig.style}`}
                                title="Bấm để đổi trạng thái"
                            >
                                <RefreshCw className="w-3 h-3" />
                                {statusConfig.label}
                            </button>
                        </td>

                        <td className="px-6 py-4 font-semibold">{comic.chapters}</td>
                        <td className="px-6 py-4 flex items-center gap-1 text-gray-600">
                            <Eye className="w-4 h-4" /> {comic.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Sửa">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(comic.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" 
                                    title="Xóa"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                        </tr>
                    );
                  })
              ) : (
                  <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                          Không tìm thấy truyện nào theo bộ lọc này.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}