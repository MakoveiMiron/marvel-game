import CryptoJS from 'crypto-js'
import { PUBLIC_KEY, PRIVATE_KEY } from './constans'


export default function hashing(timestamp){

    const stringToHash = `${timestamp}d5c5f7df458e2e0d3207ec1c9f42acce2739bb2fccbad2fc930ed4575d1bb5e4ba6026cc`; 

    const hash = CryptoJS.MD5(stringToHash).toString();

    return hash
}
