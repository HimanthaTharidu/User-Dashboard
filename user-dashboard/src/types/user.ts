export interface User{
    id : number
    firstName : string
    lastName : string
    email : string
    phone: string
    image: string
    company : Company
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