import { apiClient } from './api';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginResponseData {
  token: string;
}

export const authService = {
  async login(payload: LoginPayload): Promise<ApiResponse<LoginResponseData>> {
    const res = await apiClient<ApiResponse<LoginResponseData>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (res.data?.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({ username: payload.username }));
    }

    return res;
  },

  async register(payload: RegisterPayload): Promise<ApiResponse> {
    return apiClient<ApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  getUser(): { username: string } | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};
