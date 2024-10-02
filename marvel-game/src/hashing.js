import CryptoJS from 'crypto-js'
import { PUBLIC_KEY, PRIVATE_KEY } from './constans'


export default async function hashing(timestamp){

    const hash = await CryptoJS.MD5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`).toString();
    
    console.log(hash)

    return hash
}