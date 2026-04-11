export interface User{
    id : number
    firstname : string
    lastname : string
    email : string
    phone: string
    image: string
}

export interface UseResponse{
    users : User[]
}