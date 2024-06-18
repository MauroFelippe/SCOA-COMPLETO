import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const RecadoFuncionario = () => {
  const [recados, setRecados] = useState([]);
  const [novoRecado, setNovoRecado] = useState({
    titulo: '',
    recado: '',
    data: '',
    horario: '',
    turma: '' // Novo campo
  });

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

  const salvarRecado = () => {
    axios.post('http://localhost:8080/salvar', novoRecado)
      .then(response => {
        console.log('Recado adicionado com sucesso: ', response.data);
        carregarRecados();
        setNovoRecado({
          titulo: '',
          recado: '',
          data: '',
          horario: '',
          turma: '' // Resetar campo
        });
      })
      .catch(error => {
        console.error('Erro ao salvar recado: ', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoRecado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleExcluir = (codigo) => {
    axios.delete(`http://localhost:8080/deletar?codigo=${codigo}`)
      .then(response => {
        console.log('Recado excluído com sucesso.');
        carregarRecados();
      })
      .catch(error => {
        console.error('Erro ao excluir recado: ', error);
      });
  };

  return (
    <div>
      <h2>Recados para Funcionários</h2>
      <Form onSubmit={(e) => { e.preventDefault(); salvarRecado(); }}>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" name="titulo" placeholder="Título do recado" value={novoRecado.titulo} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="formRecado">
          <Form.Label>Recado</Form.Label>
          <Form.Control as="textarea" rows={3} name="recado" placeholder="Conteúdo do recado" value={novoRecado.recado} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="formData">
          <Form.Label>Data</Form.Label>
          <Form.Control type="text" name="data" placeholder="Data" value={novoRecado.data} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="formHorario">
          <Form.Label>Horário</Form.Label>
          <Form.Control type="text" name="horario" placeholder="Horário" value={novoRecado.horario} onChange={handleInputChange} required />
        </Form.Group>
        <Form.Group controlId="formTurma">
          <Form.Label>Turma</Form.Label>
          <Form.Control as="select" name="turma" value={novoRecado.turma} onChange={handleInputChange} required>
            <option value="">Selecione a Turma</option>
            {turmasPreDefinidas.map((turma, index) => (
              <option key={index} value={turma}>{turma}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Salvar Recado</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Título</th>
            <th>Recado</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Turma</th>
            <th>Ações</th>
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
              <td>
                <Button variant="danger" onClick={() => handleExcluir(recado.codigo)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecadoFuncionario;