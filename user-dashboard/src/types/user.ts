export interface User{
    id : number
    firstName : string
    lastName : string
    email : string
    phone: string
    image: string
    company : {
        department : string
        title : string
    };
}

export interface UserResponse{
    users : User[]
}