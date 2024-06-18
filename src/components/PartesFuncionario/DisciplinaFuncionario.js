import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const DisciplinaProfessor = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [novaDisciplina, setNovaDisciplina] = useState({
    turma: '',
    disciplina: '',
    professor: '',
    data: '',
    descricao: '',
    link: '',
    tipo: ''
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [disciplinaEditar, setDisciplinaEditar] = useState(null);

  const turmasPreDefinidas = ['1A', '2B', '3C']; // Lista de turmas predefinidas
  const disciplinasPreDefinidas = [
    'Matemática', 'Português', 'História', 'Geografia', 
    'Filosofia', 'Sociologia', 'Física', 'Educação Física', 
    'Inglês', 'Biologia', 'Química'
  ];

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

  const buscarPorId = (id) => {
    axios.get(`http://localhost:8080/buscarDisciplinaPorID?codigo=${id}`)
      .then(response => {
        setDisciplinaEditar(response.data);
        setModoEdicao(true);
      })
      .catch(error => {
        console.error('Erro ao buscar disciplina por ID: ', error);
      });
  };

  const salvarDisciplina = () => {
    if (modoEdicao && disciplinaEditar) {
      axios.put('http://localhost:8080/api/Disciplina', disciplinaEditar)
        .then(response => {
          console.log('Disciplina atualizada com sucesso: ', response.data);
          setModoEdicao(false);
          setDisciplinaEditar(null);
          carregarDisciplinas();
        })
        .catch(error => {
          console.error('Erro ao atualizar disciplina: ', error);
        });
    } else {
      axios.post('http://localhost:8080/salvarDisciplina', novaDisciplina)
        .then(response => {
          console.log('Disciplina adicionada com sucesso: ', response.data);
          carregarDisciplinas();
          setNovaDisciplina({
            turma: '',
            disciplina: '',
            professor: '',
            data: '',
            descricao: '',
            link: '',
            tipo: ''
          });
        })
        .catch(error => {
          console.error('Erro ao salvar disciplina: ', error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (modoEdicao && disciplinaEditar) {
      setDisciplinaEditar(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setNovaDisciplina(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleExcluir = (codigo) => {
    axios.delete(`http://localhost:8080/deletarDisciplina?codigo=${codigo}`)
      .then(response => {
        console.log('Disciplina excluída com sucesso.');
        carregarDisciplinas();
      })
      .catch(error => {
        console.error('Erro ao excluir disciplina: ', error);
      });
  };

  const handleCancelarEdicao = () => {
    setModoEdicao(false);
    setDisciplinaEditar(null);
  };

  return (
    <div>
      <h2>Disciplinas para Professores</h2>
      <Button variant="primary" onClick={() => buscarPorTurma('SuaTurmaAqui')}>
        Buscar por Turma
      </Button>
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
            <th>Ações</th>
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
              <td>
                <Button variant="warning" onClick={() => buscarPorId(disciplina.codigo)}>Editar</Button>{' '}
                <Button variant="danger" onClick={() => handleExcluir(disciplina.codigo)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {modoEdicao && disciplinaEditar &&
        <div>
          <h3>Editar Disciplina</h3>
          <Form onSubmit={(e) => { e.preventDefault(); salvarDisciplina(); }}>
            <Form.Group controlId="formTurma">
              <Form.Label>Turma</Form.Label>
              <Form.Control as="select" name="turma" value={disciplinaEditar.turma} onChange={handleInputChange} required>
                <option value="">Selecione a Turma</option>
                {turmasPreDefinidas.map((turma, index) => (
                  <option key={index} value={turma}>{turma}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDisciplina">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control as="select" name="disciplina" value={disciplinaEditar.disciplina} onChange={handleInputChange} required>
                <option value="">Selecione a Disciplina</option>
                {disciplinasPreDefinidas.map((disciplina, index) => (
                  <option key={index} value={disciplina}>{disciplina}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProfessor">
              <Form.Label>Professor</Form.Label>
              <Form.Control type="text" name="professor" value={disciplinaEditar.professor} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formData">
              <Form.Label>Data</Form.Label>
              <Form.Control type="text" name="data" value={disciplinaEditar.data} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" name="descricao" value={disciplinaEditar.descricao} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" name="link" value={disciplinaEditar.link} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" name="tipo" value={disciplinaEditar.tipo} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Salvar Alterações</Button>{' '}
            <Button variant="secondary" onClick={handleCancelarEdicao}>Cancelar</Button>
          </Form>
        </div>
      }

      {!modoEdicao &&
        <div>
          <h3>Inserir Nova Disciplina</h3>
          <Form onSubmit={(e) => { e.preventDefault(); salvarDisciplina(); }}>
            <Form.Group controlId="formTurma">
              <Form.Label>Turma</Form.Label>
              <Form.Control as="select" name="turma" value={novaDisciplina.turma} onChange={handleInputChange} required>
                <option value="">Selecione a Turma</option>
                {turmasPreDefinidas.map((turma, index) => (
                  <option key={index} value={turma}>{turma}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDisciplina">
              <Form.Label>Disciplina</Form.Label>
              <Form.Control as="select" name="disciplina" value={novaDisciplina.disciplina} onChange={handleInputChange} required>
                <option value="">Selecione a Disciplina</option>
                {disciplinasPreDefinidas.map((disciplina, index) => (
                  <option key={index} value={disciplina}>{disciplina}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formProfessor">
              <Form.Label>Professor</Form.Label>
              <Form.Control type="text" name="professor" placeholder="Professor" value={novaDisciplina.professor} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formData">
              <Form.Label>Data</Form.Label>
              <Form.Control type="text" name="data" placeholder="Data" value={novaDisciplina.data} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" name="descricao" placeholder="Descrição" value={novaDisciplina.descricao} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formLink">
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" name="link" placeholder="Link" value={novaDisciplina.link} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formTipo">
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" name="tipo" placeholder="Tipo" value={novaDisciplina.tipo} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">Salvar Disciplina</Button>{' '}
            <Button variant="secondary" onClick={() => {
              setNovaDisciplina({
                turma: '',
                disciplina: '',
                professor: '',
                data: '',
                descricao: '',
                link: '',
                tipo: ''
              });
              setModoEdicao(false);
              setDisciplinaEditar(null);
            }}>
              Limpar
            </Button>
          </Form>
        </div>
      }
    </div>
  );
};

export default DisciplinaProfessor;
