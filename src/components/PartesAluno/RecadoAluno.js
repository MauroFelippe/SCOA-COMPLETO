import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const RecadoAluno = () => {
  const [recados, setRecados] = useState([]);
  const [turma, setTurma] = useState('');
  const [mensagem, setMensagem] = useState('');
  const turmasPreDefinidas = ['1A', '2B', '3C']; // Lista de turmas predefinidas

  useEffect(() => {
    carregarRecados();
  }, []);

  const carregarRecados = () => {
    axios.get('http://localhost:8080/api/recado/listar')
      .then(response => {
        setRecados(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar recados: ', error);
      });
  };

  const buscarPorTurma = () => {
    axios.get(`http://localhost:8080/buscarPorTurma?turma=${turma}`)
      .then(response => {
        if (response.status === 204) {
          setRecados([]);
          setMensagem('Não há recados para esta turma.');
        } else {
          setRecados(response.data);
          setMensagem('');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar recados por turma: ', error);
        setMensagem('Erro ao buscar recados. Tente novamente mais tarde.');
      });
  };

  return (
    <div>
      <h2>Recados para Alunos</h2>
      <Form inline onSubmit={(e) => { e.preventDefault(); buscarPorTurma(); }}>
        <Form.Group controlId="formTurma">
          <Form.Label className="mr-2">Turma</Form.Label>
          <Form.Control as="select" value={turma} onChange={(e) => setTurma(e.target.value)} required>
            <option value="">Selecione a Turma</option>
            {turmasPreDefinidas.map((turma, index) => (
              <option key={index} value={turma}>{turma}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="ml-2">Filtrar</Button>
      </Form>

      {mensagem && <Alert variant="info" className="mt-4">{mensagem}</Alert>}

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Recado</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Turma</th>
          </tr>
        </thead>
        <tbody>
          {recados.map(recado => (
            <tr key={recado.codigo}>
              <td>{recado.codigo}</td>
              <td>{recado.titulo}</td>
              <td>{recado.recado}</td>
              <td>{recado.data}</td>
              <td>{recado.horario}</td>
              <td>{recado.turma}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecadoAluno;