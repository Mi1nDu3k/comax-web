module.exports = {
  // ✅ FIX: Sửa cú pháp thành Object Literal (key: value)
  darkMode: 'class', 

  theme: {
    extend: {
      // Ví dụ: thêm màu sắc hoặc font riêng
    },
  },

  variants: {
    extend: {},
  },
  
  plugins: [],
  
  // Vị trí của content là đúng trong phiên bản hiện đại
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};