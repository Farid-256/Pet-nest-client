import { headers } from "next/headers"
import { auth } from "./auth"

export const getData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/animals?limit=6`)
    const data = await res.json()
    return data
}

export const getPets = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/animals`)
    const data = await res.json()
    return data
}

export const getAnimalById = async(animalId) =>{
    const {token} = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/animals/${animalId}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    const data = await res.json()
    return data
}