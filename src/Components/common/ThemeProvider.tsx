
'use client';

// FIX: Nhập cả component và type (ThemeProviderProps) trực tiếp từ gói chính 'next-themes'
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

// Export component ThemeProvider để sử dụng trong layout
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}