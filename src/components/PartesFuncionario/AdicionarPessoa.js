import React, { useState } from 'react';

function AdicionarPessoa() {
  const [tipo, setTipo] = useState('aluno');
  const [dados, setDados] = useState({
    nome: '',
    dataNascimento: '',
    bairro: '',
    sexo: '',
    turma: '',
    matricula: '',
    usuario: '',
    senha: ''
  });
  const [buscaUsuario, setBuscaUsuario] = useState('');
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = () => {
    if (tipo === 'aluno' && (!dados.nome || !dados.dataNascimento || !dados.bairro || !dados.sexo || !dados.turma || !dados.matricula || !dados.usuario || !dados.senha)) {
      alert('Todos os campos são obrigatórios para alunos');
      return;
    }
    if (tipo === 'funcionario' && (!dados.usuario || !dados.senha)) {
      alert('Usuário e senha são obrigatórios para funcionários');
      return;
    }

    const endpoint = tipo === 'aluno' ? 'http://localhost:8080/salvarAluno' : 'http://localhost:8080/salvarFuncionario';
    const payload = tipo === 'aluno' ? dados : { usuario: dados.usuario, senha: dados.senha };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao adicionar pessoa');
      }
      return response.json();
    })
    .then(data => {
      alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} adicionado com sucesso`);
      setDados({
        nome: '',
        dataNascimento: '',
        bairro: '',
        sexo: '',
        turma: '',
        matricula: '',
        usuario: '',
        senha: ''
      });
    })
    .catch(error => alert('Erro ao adicionar pessoa'));
  };

  const handleSearch = () => {
    const endpointAluno = `http://localhost:8080/buscarUsuario?usuario=${buscaUsuario}`;
    const endpointFuncionario = `http://localhost:8080/buscarFuncionario?usuario=${buscaUsuario}`;

    fetch(endpointAluno)
      .then(response => {
        if (!response.ok) {
          throw new Error('Aluno não encontrado');
        }
        return response.json();
      })
      .then(data => setUsuarioEncontrado({ ...data, tipo: 'aluno' }))
      .catch(() => {
        fetch(endpointFuncionario)
          .then(response => {
            if (!response.ok) {
              throw new Error('Funcionário não encontrado');
            }
            return response.json();
          })
          .then(data => setUsuarioEncontrado({ ...data, tipo: 'funcionario' }))
          .catch(error => alert('Usuário não encontrado'));
      });
  };

  const handleDelete = (codigo) => {
    const endpoint = usuarioEncontrado.tipo === 'aluno' ? `http://localhost:8080/deletarAluno?codigo=${codigo}` : `http://localhost:8080/deletarFuncionario?codigo=${codigo}`;

    fetch(endpoint, {
      method: 'DELETE',
    })
    .then(() => {
      alert('Usuário deletado com sucesso');
      setUsuarioEncontrado(null);
    })
    .catch(error => alert('Erro ao deletar usuário'));
  };

  const handleEdit = () => {
    const endpoint = usuarioEncontrado.tipo === 'aluno' ? 'http://localhost:8080/api/aluno' : 'http://localhost:8080/api/funcionario';

    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao editar pessoa');
      }
      return response.json();
    })
    .then(data => {
      alert('Usuário editado com sucesso');
      setUsuarioEncontrado(data);
    })
    .catch(error => alert('Erro ao editar usuário'));
  };

  return (
    <div>
      <h2>Adicionar {tipo === 'aluno' ? 'Aluno' : 'Funcionário'}</h2>
      <div>
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="aluno">Aluno</option>
            <option value="funcionario">Funcionário</option>
          </select>
        </label>
      </div>
      {tipo === 'aluno' && (
        <>
          <input type="text" name="nome" placeholder="Nome" value={dados.nome} onChange={handleInputChange} />
          <input type="text" name="dataNascimento" placeholder="Data de Nascimento" value={dados.dataNascimento} onChange={handleInputChange} />
          <input type="text" name="bairro" placeholder="Bairro" value={dados.bairro} onChange={handleInputChange} />
          <input type="text" name="sexo" placeholder="Sexo" value={dados.sexo} onChange={handleInputChange} />
          <label>
            Turma:
            <select name="turma" value={dados.turma} onChange={handleInputChange}>
              <option value="">Selecione a Turma</option>
              <option value="1A">1A</option>
              <option value="2B">2B</option>
              <option value="3C">3C</option>
            </select>
          </label>
          <input type="number" name="matricula" placeholder="Matrícula" value={dados.matricula} onChange={handleInputChange} />
        </>
      )}
      <input type="text" name="usuario" placeholder="Usuário" value={dados.usuario} onChange={handleInputChange} />
      <input type="password" name="senha" placeholder="Senha" value={dados.senha} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Adicionar</button>

      <h2>Buscar Usuário</h2>
      <input type="text" placeholder="Usuário" value={buscaUsuario} onChange={(e) => setBuscaUsuario(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>

      {usuarioEncontrado && (
        <div>
          <h3>Usuário Encontrado:</h3>
          <p>Nome: {usuarioEncontrado.nome}</p>
          <p>Data de Nascimento: {usuarioEncontrado.dataNascimento}</p>
          <p>Bairro: {usuarioEncontrado.bairro}</p>
          <p>Sexo: {usuarioEncontrado.sexo}</p>
          <p>Turma: {usuarioEncontrado.turma}</p>
          <p>Matrícula: {usuarioEncontrado.matricula}</p>
          <p>Usuário: {usuarioEncontrado.usuario}</p>
          <p>Senha: {usuarioEncontrado.senha}</p>
          <button onClick={() => handleDelete(usuarioEncontrado.codigo)}>Deletar</button>
          <button onClick={handleEdit}>Editar</button>
        </div>
      )}
    </div>
  );
}

export default AdicionarPessoa;

