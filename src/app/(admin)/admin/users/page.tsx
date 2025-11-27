'use client';

import { useState } from 'react';
import AdminHeader from '@/Components/admin/AdminHeader';
import { MOCK_USERS, UserAdmin } from '@/Data/adminMock';
import { Trash2, Shield, Ban, CheckCircle,Crown } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserAdmin[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Chức năng Xóa User
  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa user này?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // 2. Chức năng Đổi Trạng thái (Ban/Active)
  const toggleStatus = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u
    ));
  };
  
  const toggleVip = (id: number) => {
    setUsers(users.map(u =>
      // Đảo ngược trạng thái isVip
      u.id === id ? { ...u, isVip: !u.isVip } : u
    ));
  };

  // 3. Lọc User
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
            placeholder="Tìm kiếm user..." 
            className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
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
                <th className="px-6 py-4"> VIP</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ngày tham gia</th>
                <th className="px-6 py-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800 text-sm">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-800 dark:text-white">{user.username}</p>
                    <p className="text-gray-500 text-xs">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="text-gray-600">User</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleStatus(user.id)} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold cursor-pointer transition ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}>
                      {user.status === 'active' ? <CheckCircle className="w-3 h-3"/> : <Ban className="w-3 h-3"/>}
                      {user.status.toUpperCase()}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.joinedAt}</td>
                  


                  <td className="px-6 py-4 text-right">
                    <button 
                            onClick={() => toggleVip(user.id)}
                            className={`p-2 rounded-lg transition ${
                                user.isVip 
                                ? 'text-yellow-600 hover:bg-yellow-50' 
                                : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                            title={user.isVip ? 'Hạ cấp VIP' : 'Nâng cấp VIP'}
                        >
                            <Crown className="w-4 h-4 fill-current" />
                        </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition" 
                      title="Xóa User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
             <div className="p-8 text-center text-gray-500">Không tìm thấy user nào.</div>
          )}
        </div>
      </main>
    </>
  );
}