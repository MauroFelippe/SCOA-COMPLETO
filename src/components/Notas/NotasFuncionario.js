import React, { useState, useEffect, useCallback } from 'react';

const disciplinas = [
  'portugues', 'matematica', 'historia', 'geografia', 
  'biologia', 'fisica', 'quimica', 'edfisica', 
  'ingles', 'sociologia', 'filosofia'
];

const turmasPreDefinidas = ['1A', '2B', '3C']; // Lista de turmas predefinidas

function NotasFuncionario() {
  const [notas, setNotas] = useState([]);
  const [turma, setTurma] = useState('');
  const [aluno, setAluno] = useState('');
  const [bimestre, setBimestre] = useState(1);
  const [notasFaltas, setNotasFaltas] = useState(
    disciplinas.reduce((acc, disciplina) => {
      acc[disciplina] = { nota: 0.0, faltas: 0 };
      return acc;
    }, {})
  );
  const [error, setError] = useState('');

  const fetchNotas = useCallback(() => {
    fetch(`http://localhost:8080/api/notas/listar?turma=${turma}&aluno=${aluno}&bimestre=${bimestre}`)
      .then(response => response.json())
      .then(data => setNotas(Array.isArray(data) ? data : []))
      .catch(error => setError('Erro ao listar notas'));
  }, [turma, aluno, bimestre]);

  useEffect(() => {
    if (turma && aluno && bimestre) {
      fetchNotas();
    }
  }, [turma, aluno, bimestre, fetchNotas]);

  const handleSave = () => {
    const notasPayload = {
      turma,
      aluno,
      bimestre,
      ...Object.keys(notasFaltas).reduce((acc, disciplina) => {
        acc[disciplina] = notasFaltas[disciplina].nota;
        acc[`faltas${disciplina}`] = notasFaltas[disciplina].faltas;
        return acc;
      }, {})
    };

    const endpoint = `http://localhost:8080/salvarNotas${bimestre}`;

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notasPayload)
    })
    .then(response => response.json())
    .then(data => {
      setNotas(prevNotas => [...prevNotas, data]);
      setError('');
    })
    .catch(error => setError('Erro ao salvar notas'));
  };

  const handleNotaChange = (disciplina, value) => {
    setNotasFaltas({
      ...notasFaltas,
      [disciplina]: { ...notasFaltas[disciplina], nota: parseFloat(value) }
    });
  };

  const handleFaltasChange = (disciplina, value) => {
    setNotasFaltas({
      ...notasFaltas,
      [disciplina]: { ...notasFaltas[disciplina], faltas: parseInt(value) }
    });
  };

  return (
    <div>
      <h2>Notas do Aluno</h2>
      <select value={turma} onChange={(e) => setTurma(e.target.value)} placeholder="Selecionar Turma">
        <option value="">Selecionar Turma</option>
        {turmasPreDefinidas.map((opcao, index) => (
          <option key={index} value={opcao}>{opcao}</option>
        ))}
      </select>
      <input type="text" value={aluno} onChange={(e) => setAluno(e.target.value)} placeholder="Nome do Aluno" />
      <select value={bimestre} onChange={(e) => setBimestre(e.target.value)} placeholder="Selecionar Bimestre">
        <option value={1}>1º Bimestre</option>
        <option value={2}>2º Bimestre</option>
        <option value={3}>3º Bimestre</option>
        <option value={4}>4º Bimestre</option>
      </select>
      <button onClick={fetchNotas}>Buscar</button>
      {error && <p>{error}</p>}
      <div>
        {disciplinas.map((disciplina, index) => (
          <div key={index}>
            <label>{disciplina.charAt(0).toUpperCase() + disciplina.slice(1)}: </label>
            <input 
              type="number" 
              step="0.1" 
              min="0" 
              max="10" 
              placeholder="Nota" 
              value={notasFaltas[disciplina].nota}
              onChange={(e) => handleNotaChange(disciplina, e.target.value)} 
            />
            <input 
              type="number" 
              min="0" 
              placeholder="Faltas" 
              value={notasFaltas[disciplina].faltas}
              onChange={(e) => handleFaltasChange(disciplina, e.target.value)} 
            />
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Salvar</button>
      <ul>
        {Array.isArray(notas) && notas.map(item => (
          <li key={item.codigo}>
            Bimestre: {item.bimestre} - Aluno: {item.aluno} - Turma: {item.turma}
            <ul>
              {disciplinas.map((disciplina, index) => (
                <li key={index}>
                  {disciplina.charAt(0).toUpperCase() + disciplina.slice(1)}: {item[disciplina]} - Faltas: {item[`faltas${disciplina}`]}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotasFuncionario;
