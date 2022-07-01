import axios from 'axios'

// criando a variável API-url
const api = axios.create({
    // baseURL nunca é alterado
    baseURL: "https://viacep.com.br/ws/"
})

export default api;