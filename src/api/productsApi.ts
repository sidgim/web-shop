import axios from 'axios'


const producApi = axios.create({
  baseURL: import.meta.env.VITE_PRODUCTS_API_URL,
})

//interceptor

export {producApi}
