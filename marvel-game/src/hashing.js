import CryptoJS from 'crypto-js'
import { PUBLIC_KEY, PRIVATE_KEY } from './constans'


export default async function hashing(timestamp){

    const hash = await CryptoJS.MD5(`${timestamp}${PUBLIC_KEY}${PRIVATE_KEY}`).toString();
    
    return hash
}