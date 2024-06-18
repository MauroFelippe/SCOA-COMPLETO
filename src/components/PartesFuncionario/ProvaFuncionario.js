/*
import React, { useState, useEffect } from 'react';

const turmasPreDefinidas = ['1A', '2B', '3C']; // Lista de turmas predefinidas
const disciplinasPreDefinidas = [
  'Matemática', 'Português', 'História', 'Geografia', 
  'Filosofia', 'Sociologia', 'Física', 'Educação Física', 
  'Inglês', 'Biologia', 'Química'
];

function ProvaFuncionario() {
  const [provas, setProvas] = useState([]);
  const [turma, setTurma] = useState('');
  const [prova, setProva] = useState(null);
  const [novaProva, setNovaProva] = useState({ materia: '', turma: '', data: '', disciplina: '' });
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

  const handleSave = () => {
    fetch('http://localhost:8080/salvarProva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novaProva)
    })
    .then(response => response.json())
    .then(data => {
      setProvas([...provas, data]);
      setNovaProva({ materia: '', turma: '', data: '', disciplina: '' });
    })
    .catch(error => setError('Erro ao salvar prova'));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/deletarProva?codigo=${id}`, { method: 'DELETE' })
      .then(() => {
        setProvas(provas.filter(item => item.codigo !== id));
      })
      .catch(error => setError('Erro ao deletar prova'));
  };

  const handleUpdate = (id) => {
    fetch('http://localhost:8080/api/prova', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prova)
    })
    .then(response => response.json())
    .then(data => {
      setProvas(provas.map(item => (item.codigo === id ? data : item)));
      setProva(null);
    })
    .catch(error => setError('Erro ao atualizar prova'));
  };

  return (
    <div>
      <h2>Provas do Funcionário</h2>
      <select value={turma} onChange={(e) => setTurma(e.target.value)} placeholder="Selecionar Turma">
        <option value="">Selecionar Turma</option>
        {turmasPreDefinidas.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
      <button onClick={handleSearchByTurma}>Buscar por Turma</button>
      {prova && (
        <div>
          <input type="text" value={prova.materia} onChange={(e) => setProva({ ...prova, materia: e.target.value })} />
          <select value={prova.turma} onChange={(e) => setProva({ ...prova, turma: e.target.value })} placeholder="Selecionar Turma">
            <option value="">Selecionar Turma</option>
            {turmasPreDefinidas.map((opcao, index) => (
              <option key={index} value={opcao}>{opcao}</option>
            ))}
          </select>
          <button onClick={() => handleUpdate(prova.codigo)}>Atualizar</button>
        </div>
      )}
      <div>
        <input type="text" value={novaProva.materia} onChange={(e) => setNovaProva({ ...novaProva, materia: e.target.value })} placeholder="Materia" />
        <select value={novaProva.turma} onChange={(e) => setNovaProva({ ...novaProva, turma: e.target.value })} placeholder="Selecionar Turma">
          <option value="">Selecionar Turma</option>
          {turmasPreDefinidas.map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
        </select>
        <input type="text" value={novaProva.data} onChange={(e) => setNovaProva({ ...novaProva, data: e.target.value })} placeholder="Data" />
        <select value={novaProva.disciplina} onChange={(e) => setNovaProva({ ...novaProva, disciplina: e.target.value })} placeholder="Selecionar Disciplina">
          <option value="">Selecionar Disciplina</option>
          {disciplinasPreDefinidas.map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
        </select>
        <button onClick={handleSave}>Adicionar</button>
      </div>
      {error && <p>{error}</p>}
      <ul>
        {provas.map(item => (
          <li key={item.codigo}>
            {item.materia} - {item.turma} - {item.data} - {item.disciplina}
            <button onClick={() => handleDelete(item.codigo)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProvaFuncionario;*/
import React, { useState, useEffect } from 'react';

const turmasPreDefinidas = ['1A', '2B', '3C']; // Lista de turmas predefinidas
const disciplinasPreDefinidas = [
  'Matemática', 'Português', 'História', 'Geografia', 
  'Filosofia', 'Sociologia', 'Física', 'Educação Física', 
  'Inglês', 'Biologia', 'Química'
];

function ProvaFuncionario() {
  const [provas, setProvas] = useState([]);
  const [turma, setTurma] = useState('');
  const [prova, setProva] = useState(null);
  const [novaProva, setNovaProva] = useState({ materia: '', turma: '', data: '', disciplina: '' });
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

  const handleSave = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!novaProva.materia || !novaProva.turma || !novaProva.data || !novaProva.disciplina) {
      setError('Todos os campos são obrigatórios');
      return;
    }
    
    fetch('http://localhost:8080/salvarProva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        materia: novaProva.materia,
        turma: novaProva.turma,
        data: novaProva.data, // Deve ser uma string no formato YYYY-MM-DD
        disciplina: novaProva.disciplina
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao salvar prova');
      }
      return response.json();
    })
    .then(data => {
      setProvas([...provas, data]);
      setNovaProva({ materia: '', turma: '', data: '', disciplina: '' });
    })
    .catch(error => setError(error.message));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/deletarProva?codigo=${id}`, { method: 'DELETE' })
      .then(() => {
        setProvas(provas.filter(item => item.codigo !== id));
      })
      .catch(error => setError('Erro ao deletar prova'));
  };

  const handleUpdate = (id) => {
    fetch('http://localhost:8080/api/prova', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prova)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar prova');
      }
      return response.json();
    })
    .then(data => {
      setProvas(provas.map(item => (item.codigo === id ? data : item)));
      setProva(null);
    })
    .catch(error => setError('Erro ao atualizar prova'));
  };

  return (
    <div>
      <h2>Provas do Funcionário</h2>
      <select value={turma} onChange={(e) => setTurma(e.target.value)} placeholder="Selecionar Turma">
        <option value="">Selecionar Turma</option>
        {turmasPreDefinidas.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
      <button onClick={handleSearchByTurma}>Buscar por Turma</button>
      {prova && (
        <div>
          <input type="text" value={prova.materia} onChange={(e) => setProva({ ...prova, materia: e.target.value })} />
          <select value={prova.turma} onChange={(e) => setProva({ ...prova, turma: e.target.value })} placeholder="Selecionar Turma">
            <option value="">Selecionar Turma</option>
            {turmasPreDefinidas.map((opcao, index) => (
              <option key={index} value={opcao}>{opcao}</option>
            ))}
          </select>
          <button onClick={() => handleUpdate(prova.codigo)}>Atualizar</button>
        </div>
      )}
      <div>
        <input type="text" value={novaProva.materia} onChange={(e) => setNovaProva({ ...novaProva, materia: e.target.value })} placeholder="Materia" />
        <select value={novaProva.turma} onChange={(e) => setNovaProva({ ...novaProva, turma: e.target.value })} placeholder="Selecionar Turma">
          <option value="">Selecionar Turma</option>
          {turmasPreDefinidas.map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
        </select>
        <input type="date" value={novaProva.data} onChange={(e) => setNovaProva({ ...novaProva, data: e.target.value })} placeholder="Data" />
        <select value={novaProva.disciplina} onChange={(e) => setNovaProva({ ...novaProva, disciplina: e.target.value })} placeholder="Selecionar Disciplina">
          <option value="">Selecionar Disciplina</option>
          {disciplinasPreDefinidas.map((opcao, index) => (
            <option key={index} value={opcao}>{opcao}</option>
          ))}
        </select>
        <button onClick={handleSave}>Adicionar</button>
      </div>
      {error && <p>{error}</p>}
      <ul>
        {provas.map(item => (
          <li key={item.codigo}>
            {item.materia} - {item.turma} - {item.data} - {item.disciplina}
            <button onClick={() => handleDelete(item.codigo)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProvaFuncionario;
