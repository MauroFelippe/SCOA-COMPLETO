import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const DisciplinaAluno = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [turma, setTurma] = useState('');
  const turmasPreDefinidas = ['1A', '2B', '3C']; // Lista de turmas predefinidas

  useEffect(() => {
    carregarDisciplinas();
  }, []);

  const carregarDisciplinas = () => {
    axios.get('http://localhost:8080/api/Disciplina/listar')
      .then(response => {
        setDisciplinas(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar disciplinas: ', error);
      });
  };

  const buscarPorTurma = (turma) => {
    axios.get(`http://localhost:8080/buscarDisciplinaPorTurma?turma=${turma}`)
      .then(response => {
        setDisciplinas(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar disciplinas por turma: ', error);
      });
  };

  const handleTurmaChange = (event) => {
    setTurma(event.target.value);
  };

  const handleBuscar = (event) => {
    event.preventDefault();
    if (turma) {
      buscarPorTurma(turma);
    } else {
      carregarDisciplinas();
    }
  };

  return (
    <div>
      <h2>Disciplinas</h2>
      <Form onSubmit={handleBuscar}>
        <Form.Group controlId="formTurma">
          <Form.Label>Buscar por Turma</Form.Label>
          <Form.Control as="select" value={turma} onChange={handleTurmaChange}>
            <option value="">Selecione a Turma</option>
            {turmasPreDefinidas.map((turma, index) => (
              <option key={index} value={turma}>{turma}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Buscar</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Turma</th>
            <th>Disciplina</th>
            <th>Professor</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Link</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.map(disciplina => (
            <tr key={disciplina.codigo}>
              <td>{disciplina.codigo}</td>
              <td>{disciplina.turma}</td>
              <td>{disciplina.disciplina}</td>
              <td>{disciplina.professor}</td>
              <td>{disciplina.data}</td>
              <td>{disciplina.descricao}</td>
              <td><a href={disciplina.link} target="_blank" rel="noopener noreferrer">{disciplina.link}</a></td>
              <td>{disciplina.tipo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DisciplinaAluno;