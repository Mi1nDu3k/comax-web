'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';

// Vì component này cần access DOM (useTheme), nên phải là Client Component
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Fix Hydration Mismatch

  // Đảm bảo chỉ render sau khi component đã mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
        <div className="w-8 h-8 bg-gray-100 rounded-full dark:bg-gray-700 animate-pulse"></div>
    );
  }

  // Logic chuyển đổi: System -> Light -> Dark -> System
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else { // theme === 'system'
      setTheme('light');
    }
  };

  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;
  const tooltip = theme === 'light' ? 'Sáng' : theme === 'dark' ? 'Tối' : 'Hệ thống';

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      title={`Chế độ hiện tại: ${tooltip}. Click để chuyển.`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}