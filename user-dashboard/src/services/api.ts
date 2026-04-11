import axios from "axios";
import type { UserResponse } from "../types/user";

const API = "https://dummyjson.com/users"

export const fetchUsers = async (): Promise<UserResponse> => {
    const response = await axios.get(API)
    return response.data

}