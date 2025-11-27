import AdminSidebar from '@/Components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      <div className="flex-1 ml-64 flex flex-col">
        {children}
      </div>
    </div>
  );
}