import AdminHeader from '@/components/admin/AdminHeader';
import { BookOpen, Users, TrendingUp, DollarSign } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    color: string;
    icon: React.ElementType; 
}
// Thay thế ': any' bằng ': StatCardProps'
const StatCard = ({ title, value, color, icon: Icon }: StatCardProps) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm hover:shadow-md transition">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color} text-white`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    </div>
);

export default function AdminDashboardPage() {
  return (
    <>
      <AdminHeader title="Dashboard Tổng Quan" />
      <main className="p-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Tổng số Truyện" value="1,240" color="bg-blue-500" icon={BookOpen} />
            <StatCard title="Tổng Thành viên" value="8,500" color="bg-purple-500" icon={Users} />
            <StatCard title="Lượt xem tuần này" value="142.5K" color="bg-green-500" icon={TrendingUp} />
            <StatCard title="Doanh thu (Ước tính)" value="$3,200" color="bg-orange-500" icon={DollarSign} />
        </div>

        {/* Khu vực Biểu đồ hoặc Bảng hoạt động gần đây (Placeholder) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 h-80 rounded-xl border dark:border-gray-800 shadow-sm p-6 flex items-center justify-center text-gray-400">
                [Khu vực Biểu đồ Thống kê Truy cập]
            </div>
            <div className="bg-white dark:bg-gray-900 h-80 rounded-xl border dark:border-gray-800 shadow-sm p-6">
                <h3 className="font-bold mb-4 text-gray-800 dark:text-white">Hoạt động gần đây</h3>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex gap-2"><span className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></span> User <b>nguyenvan_a</b> vừa đăng ký.</li>
                    <li className="flex gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></span> Truyện <b>One Piece</b> cập nhật Chap 1100.</li>
                    <li className="flex gap-2"><span className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></span> User <b>spammer123</b> bị khóa tài khoản.</li>
                </ul>
            </div>
        </div>

      </main>
    </>
  );
}