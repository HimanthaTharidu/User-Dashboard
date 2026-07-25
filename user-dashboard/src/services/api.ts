import axios from "axios";
import type { UserResponse, LoginCredentials, AuthResponse } from "../types/user";
const API_BASE = "https://dummyjson.com";

export const fetchUsers = async (): Promise<UserResponse> => {
    const response = await axios.get(`${API_BASE}/users`);
    return response.data;
}

export const fetchUserTodos = async (userId: number) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/todos`);
    return response.data;
}

export const fetchUserPosts = async (userId: number) => {
    const response = await axios.get(`${API_BASE}/users/${userId}/posts`);
    return response.data;
}

export const fetchAuthUser = async (token: string) : Promise<AuthResponse> => {
    const response = await axios.get(`${API_BASE}/user/me`, {
        headers: {
        'Authorization': 'Bearer /* YOUR_ACCESS_TOKEN_HERE */', // Pass JWT via Authorization header
    }});
    return response.data;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE}/auth/login`, credentials);
    return response.data;
}