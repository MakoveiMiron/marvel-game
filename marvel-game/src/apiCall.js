import hashing from "./hashing";
import { PUBLIC_KEY } from './constans'; 

export default async function apiCall() {

    const hash = await hashing('1');
    console.log("Hash:", hash);

    const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${PUBLIC_KEY}&hash=${hash}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log('Data:', data);

    return data;
}
