export interface User{
    id : number
    userName: string
    firstName : string
    lastName : string
    email : string
    phone: string
    image: string
    company : Company
    accessToken?: string;
    refreshToken?: string;
}

export interface Address {
    address: string
    city: string
    state?: string
    postalCode?: string
}

export interface Company{
    department: string;
    name: string
    title: string
    address: Address
}

export interface UserResponse{
    users : User[]
}

export interface LoginCredentials {
  username: string
  password: string
  expiresInMins?: number
}

export type AuthResponse = User