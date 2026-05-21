import { headers } from "next/headers"
import { auth } from "./auth"

export const getData = async () => {
    const res = await fetch('http://localhost:5000/animals?limit=6')
    const data = await res.json()
    return data
}

export const getPets = async () => {
    const res = await fetch('http://localhost:5000/animals')
    const data = await res.json()
    return data
}

export const getAnimalById = async(animalId) =>{
    const {token} = await auth.api.getToken({
        headers: await headers()
    })

    const res = await fetch(`http://localhost:5000/animals/${animalId}`,{
        headers:{
            authorization: `Bearer ${token}`
        }
    })
    const data = await res.json()
    return data
}