import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://61e9bbc27bc0550017bc644f.mockapi.io/api/v1/',
})
