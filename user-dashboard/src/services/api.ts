import axios from "axios";
import type { UserResponse } from "../types/user";

const API = "https://dummyjson.com/users"

export const fetchUsers = async (): Promise<UserResponse> => {
    const response = await axios.get(API)
    return response.data
}

export const fetchUserTodos = async (userId: number) => {
    const response = await axios.get(`https://dummyjson.com/users/${userId}/todos`)
    return response.data
}

export const fetchUserPosts = async (userId: number) => {
    const response = await axios.get(`https://dummyjson.com/users/${userId}/posts`)
    return response.data
}