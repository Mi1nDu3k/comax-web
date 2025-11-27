'use client';

import { useState } from 'react';
// Sửa lại import thành chữ thường để chuẩn hóa
import AdminHeader from '@/components/admin/AdminHeader';
import { MOCK_USERS, UserAdmin } from '@/data/adminMock';
import { Trash2, Shield, Ban, CheckCircle, Crown } from 'lucide-react';

export default function AdminUsersPage() {
  // 1. State
  const [users, setUsers] = useState<UserAdmin[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Chức năng Xóa User
  const handleDelete = (id: number) => {
    if (confirm('CẢNH BÁO: Bạn có chắc chắn muốn xóa user này?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // 3. Chức năng Đổi Trạng thái (Ban/Active)
  const toggleStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u
    ));
  };
  
  // 4. Chức năng Toggle VIP
  const toggleVip = (id: number) => {
    setUsers(users.map(u =>
      u.id === id ? { ...u, isVip: !u.isVip } : u
    ));
  };

  // 5. Logic Lọc User (Search)
  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AdminHeader title="Quản lý Người dùng" />
      <main className="p-8">
        
        {/* Toolbar */}
        <div className="flex justify-between mb-6">
          <input 
            type="text" 
            placeholder="Tìm kiếm user (tên, email)..." 
            className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow">
            + Thêm Admin
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">VIP</th>
                <th className="px-6 py-4">Trạng thái (Click đổi)</th>
                <th className="px-6 py-4">Ngày tham gia</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800 text-sm">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  
                  {/* Cột User */}
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800 dark:text-white">{user.username}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </td>

                  {/* Cột Role */}
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">User</span>
                    )}
                  </td>

                  {/* Cột VIP */}
                  <td className="px-6 py-4">
                    {user.isVip ? (
                       <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold border border-yellow-200">
                        <Crown className="w-3 h-3 fill-yellow-500" /> VIP
                       </span>
                    ) : (
                       <span className="text-gray-400 text-xs">—</span>
                    )}
                  </td>

                  {/* Cột Trạng thái (Clickable) */}
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleStatus(user.id)} 
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold cursor-pointer transition active:scale-95 border ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                          : 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200'
                      }`}
                      title="Bấm để khóa/mở khóa"
                    >
                      {user.status === 'active' ? <CheckCircle className="w-3 h-3"/> : <Ban className="w-3 h-3"/>}
                      {user.status.toUpperCase()}
                    </button>
                  </td>

                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{user.joinedAt}</td>

                  {/* Cột Hành động */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                        {/* Nút Toggle VIP */}
                        <button 
                            onClick={() => toggleVip(user.id)}
                            className={`p-2 rounded-lg transition border ${
                                user.isVip 
                                ? 'bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100' 
                                : 'bg-white border-gray-200 text-gray-400 hover:text-yellow-600 hover:border-yellow-400'
                            }`}
                            title={user.isVip ? 'Hạ cấp VIP' : 'Nâng cấp VIP'}
                        >
                            <Crown className="w-4 h-4" />
                        </button>

                        {/* Nút Xóa */}
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg transition" 
                          title="Xóa User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
             <div className="p-8 text-center text-gray-500">Không tìm thấy user nào khớp với từ khóa.</div>
          )}
        </div>
      </main>
    </>
  );
}