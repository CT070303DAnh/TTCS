import apiClient from './apiClient';

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  fullName: string;
  email: string;
  expiresAt: string;
}

export const authService = {
  async register(userData: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
  }): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },
};
