// src/services/auth.service.ts
import { fetchClient } from '@/lib/api-client';

export async function login(data: any) {
  return fetchClient<any>('/User/login', { 
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function register(data: any) {
  return fetchClient<any>('/User/register', { 
    method: 'POST',
    body: JSON.stringify(data),
  });
}