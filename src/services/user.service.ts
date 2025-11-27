// src/services/user.service.ts
import { fetchClient } from '@/lib/api-client';

// 1. Lấy tất cả user (Cho Admin)
// Endpoint: GET /api/User
export async function getAllUsers() {
  return fetchClient<any[]>('/User');
}

// 2. Xóa user
// Endpoint: DELETE /api/User/{id}
export async function deleteUser(id: number) {
  return fetchClient<any>(`/User/${id}`, {
    method: 'DELETE',
  });
}

// 3. Nâng cấp VIP
// Endpoint: POST /api/User/{id}/upgrade-vip
export async function upgradeToVip(id: number) {
  return fetchClient<any>(`/User/${id}/upgrade-vip`, {
    method: 'POST',
  });
}

// 4. Hạ cấp VIP (Admin only)
// Endpoint: POST /api/User/{id}/downgrade-vip
export async function downgradeVip(id: number) {
  return fetchClient<any>(`/User/${id}/downgrade-vip`, {
    method: 'POST',
  });
}