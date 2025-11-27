export default function AdminHeader({ title }: { title: string }) {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-800 dark:text-white">Admin User</p>
          <p className="text-xs text-gray-500">Super Administrator</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
          AD
        </div>
      </div>
    </header>
  );
}