import React, { useState, useEffect } from 'react';

const turmasPreDefinidas = ['1A', '2B', '3C']; // Lista de turmas predefinidas

function ProvaAluno() {
  const [provas, setProvas] = useState([]);
  const [turma, setTurma] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/prova/listar')
      .then(response => response.json())
      .then(data => setProvas(data))
      .catch(error => setError('Erro ao listar provas'));
  }, []);

  const handleSearchByTurma = () => {
    fetch(`http://localhost:8080/buscarProvaPorTurma?turma=${turma}`)
      .then(response => response.json())
      .then(data => setProvas(data))
      .catch(error => setError('Erro ao buscar prova por turma'));
  };

  return (
    <div>
      <h2>Provas do Aluno</h2>
      <select value={turma} onChange={(e) => setTurma(e.target.value)} placeholder="Selecionar Turma">
        <option value="">Selecionar Turma</option>
        {turmasPreDefinidas.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
      <button onClick={handleSearchByTurma}>Buscar por Turma</button>
      {error && <p>{error}</p>}
      <ul>
        {provas.map(item => (
          <li key={item.codigo}>
            {item.materia} - {item.turma} - {item.data} - {item.disciplina}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProvaAluno;