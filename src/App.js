import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import api from './services/api'
import "./style.css"

function App() {
  // Variáveis:
  const [ input, setInput ] = useState('')
  const [ cep, setCep ] = useState({})

  // Função de pesquisa assíncrona (async), devido ao fato que pode demandar algum certo tempo para finalizar:
  async function handleSearch(){

    // Verificação se o CEP inserido está vazio:
    if (input === ''){
      alert("Preencha algum CEP...")
      return;
    }

    try{
      // Await - Devido a função que é assíncrona(async) usamos o "await" para esperar o retorno da requisição:
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }
    // Caso aconteça algo e falhe a requisição, temos um retorno de "alert" e limpamos o "input":
    catch{
      alert("Ops! Erro ao buscar...")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR CEP</h1>
      <div className="containerInput">
        <input 
          type="text"
          value={input}
          onChange={ (e) => setInput(e.target.value) }
          placeholder="Digite seu CEP..."
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {
        Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: { cep.cep }</h2>
            <span>{ cep.logradouro }</span>
            <span>{ cep.complemento }</span>
            <span>{ cep.bairro }</span>
            <span>{ cep.localidade } - { cep.uf }</span>
          </main>
        )
      }
    </div>
  );
}

export default App;
