import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setsenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('aluno'); // Valor padrão: aluno
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let loginURL = `http://localhost:8080/loginAluno?usuario=${usuario}&senha=${senha}`;
      if (tipoUsuario === 'funcionario') {
        loginURL = `http://localhost:8080/loginFuncionario?usuario=${usuario}&senha=${senha}`;
      }

      const response = await fetch(loginURL, {
        method: 'POST', // Alterado para POST
        headers: {
          'Content-Type': 'application/json'
        },
   // Enviando usuário e senha no corpo da solicitação
      });

      if (response.ok) {
        console.log('Login bem-sucedido!');
        // Você pode adicionar redirecionamento ou outra lógica aqui para lidar com o login bem-sucedido
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setError('Erro ao fazer login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="usuario">Usuário:</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="senha"
            id="senha"
            value={senha}
            onChange={(e) => setsenha(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tipoUsuario">Tipo de Usuário:</label>
          <select
            id="tipoUsuario"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            required
          >
            <option value="aluno">Aluno</option>
            <option value="funcionario">Funcionário</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;