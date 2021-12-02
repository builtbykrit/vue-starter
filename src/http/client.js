import axios from "axios"
import interceptors from "./interceptors"

const client = axios.create({ baseURL: process.env.VITE_API_URL })

// log errors
client.interceptors.response.use((res) => res, interceptors.logErrors)

export default client
