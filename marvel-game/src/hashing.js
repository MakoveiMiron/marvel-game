import CryptoJS from 'crypto-js'
import { PUBLIC_KEY, PRIVATE_KEY } from './constans'


export default function hashing(timestamp){

    console.log(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`)

    const stringToHash = `${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`; 

    
    const hash = CryptoJS.MD5(stringToHash).toString();

    return hash
}
