/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BibliotecaAluno() {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [busca, setBusca] = useState('');
  const [biblioteca, setBiblioteca] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/biblioteca/listar')
      .then(response => setBibliotecas(response.data))
      .catch(error => console.error(error));
  }, []);

  const buscarPorNome = () => {
    axios.get(`http://localhost:8080/api/biblioteca/buscarBibliotecaPorNome?nome=${busca}`)
      .then(response => setBiblioteca(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Biblioteca - Aluno</h2>
      <div>
        <input 
          type="text" 
          placeholder="Buscar por Nome" 
          value={busca} 
          onChange={(e) => setBusca(e.target.value)} 
        />
        <button onClick={buscarPorNome}>Buscar</button>
      </div>
      {biblioteca && (
        <div>
          <h3>Biblioteca encontrada:</h3>
          <p>Código: {biblioteca.codigo}</p>
          <p>Fileira: {biblioteca.fileira}</p>
          <p>Aluguel: {biblioteca.aluguel ? 'Sim' : 'Não'}</p>
          {biblioteca.aluguel && <p>Data de Aluguel: {biblioteca.dataAluguel}</p>}
          <p>Nome: {biblioteca.nome}</p>
          <p>Descrição: {biblioteca.descricao}</p>
        </div>
      )}
      <h3>Lista de Bibliotecas:</h3>
      <ul>
        {bibliotecas.map(b => (
          <li key={b.codigo}>
            {b.nome} - {b.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BibliotecaAluno;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BibliotecaAluno() {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    fetchBibliotecas();
  }, []);

  const fetchBibliotecas = () => {
    axios.get('http://localhost:8080/api/biblioteca/listar')
      .then(response => setBibliotecas(response.data))
      .catch(error => console.error(error));
  };

  const buscarPorNome = () => {
    axios.get(`http://localhost:8080/api/biblioteca/buscarBibliotecaPorNome?nome=${busca}`)
      .then(response => setBibliotecas(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Biblioteca - Aluno</h2>
      <div>
        <input 
          type="text" 
          placeholder="Buscar por Nome" 
          value={busca} 
          onChange={(e) => setBusca(e.target.value)} 
        />
        <button onClick={buscarPorNome}>Buscar</button>
      </div>
      <h3>Resultados da Busca:</h3>
      {bibliotecas.length > 0 ? (
        <ul>
          {bibliotecas.map(b => (
            <li key={b.codigo}>
              <p>Código: {b.codigo}</p>
              <p>Fileira: {b.fileira}</p>
              <p>Aluguel: {b.aluguel ? 'Sim' : 'Não'}</p>
              {b.aluguel && <p>Data de Aluguel: {b.dataAluguel}</p>}
              <p>Nome: {b.nome}</p>
              <p>Descrição: {b.descricao}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
}

export default BibliotecaAluno;