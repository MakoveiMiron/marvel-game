import hashing from "./hashing";
import { PUBLIC_KEY } from './constans'

export default async function apiCall(){

    const timestamp = Date.now()
    console.log(timestamp)

    const hash = await hashing(timestamp)

    const characters = await fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=${PUBLIC_KEY}`)
    .then(resp => {resp.json} )
    .then(data => { return data})

    return characters
}