import hashing from "./hashing";
import { PUBLIC_KEY } from './constans'

export default async function apiCall(){

    const timestamp = Date.now()

    const hash = await hashing(timestamp)

    const characters = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    .then(resp => {resp.json} )
    .then(data => { return data})

    return characters
}