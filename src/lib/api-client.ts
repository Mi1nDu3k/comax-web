const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 2. Nếu có token, gắn vào Header Authorization
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });
  

  // 4. Xử lý lỗi HTTP (4xx, 5xx)
  if (!response.ok) {
    // Có thể parse lỗi từ backend trả về tại đây
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error: ${response.statusText}`);
  }
  return response.json();
}