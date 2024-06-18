/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BibliotecaFuncionario() {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [formData, setFormData] = useState({
    codigo: '',
    fileira: '',
    aluguel: '', // Alterado para string simples
    dataAluguel: '', // Adicionado ao lado do aluguel
    nome: '',
    descricao: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBibliotecas();
  }, []);

  const fetchBibliotecas = () => {
    axios.get('http://localhost:8080/api/biblioteca/listar')
      .then(response => setBibliotecas(response.data))
      .catch(error => console.error(error));
  };

  const buscarPorID = (id) => {
    axios.get(`http://localhost:8080/api/biblioteca/buscarBibliotecaPorID/${id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          codigo: data.codigo,
          fileira: data.fileira,
          aluguel: data.aluguel,
          dataAluguel: data.dataAluguel ? 'Sim' : '',
          nome: data.nome,
          descricao: data.descricao
        });
      })
      .catch(error => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      aluguel: formData.aluguel.trim() === 'Sim' ? 'Sim' : 'Não', // Converte para 'Sim' ou 'Não'
      dataAluguel: formData.dataAluguel.trim() ? true : false // Converte para Booleano
    };

    if (!validateFormData(data)) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const endpoint = formData.codigo
      ? `http://localhost:8080/api/biblioteca/${formData.codigo}`
      : 'http://localhost:8080/api/biblioteca/salvarBiblioteca';

    const method = formData.codigo ? 'PUT' : 'POST';

    axios({
      method: method,
      url: endpoint,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (formData.codigo) {
          setBibliotecas(prev => prev.map(b => b.codigo === formData.codigo ? response.data : b));
        } else {
          setBibliotecas(prev => [...prev, response.data]);
        }
        setFormData({
          codigo: '',
          fileira: '',
          aluguel: '', // Reinicia
          dataAluguel: '', // Reinicia
          nome: '',
          descricao: ''
        });
        setError('');
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.message || 'Erro ao processar requisição');
        } else {
          setError('Erro de rede ou servidor indisponível');
        }
      });
  };

  const validateFormData = (data) => {
    return (
      data.fileira &&
      data.nome &&
      data.descricao &&
      (data.aluguel === 'Sim' ? data.dataAluguel : true)
    );
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/biblioteca/deletarBiblioteca/${id}`)
      .then(() => setBibliotecas(prev => prev.filter(b => b.codigo !== id)))
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div>
      <h2>Biblioteca - Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="fileira" 
          placeholder="Fileira" 
          value={formData.fileira} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="aluguel" 
          placeholder="Aluguel (Sim ou Não)" 
          value={formData.aluguel} 
          onChange={handleChange} 
          required 
        />
        {formData.aluguel.trim() === 'Sim' && (
          <input 
            type="text" 
            name="dataAluguel" 
            placeholder="Data de Aluguel" 
            value={formData.dataAluguel} 
            onChange={handleChange} 
            required 
          />
        )}
        <input 
          type="text" 
          name="nome" 
          placeholder="Nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="descricao" 
          placeholder="Descrição" 
          value={formData.descricao} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">{formData.codigo ? 'Editar' : 'Adicionar'}</button>
      </form>
      {error && <p>{error}</p>}
      <h3>Lista de Bibliotecas:</h3>
      <ul>
        {bibliotecas.map(b => (
          <li key={b.codigo}>
            {b.nome} - {b.descricao}
            <button onClick={() => buscarPorID(b.codigo)}>Editar</button>
            <button onClick={() => handleDelete(b.codigo)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BibliotecaFuncionario;*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BibliotecaFuncionario() {
  const [bibliotecas, setBibliotecas] = useState([]);
  const [formData, setFormData] = useState({
    codigo: '',
    fileira: '',
    aluguel: '', // Alterado para string simples
    dataAluguel: '', // Adicionado ao lado do aluguel
    nome: '',
    descricao: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBibliotecas();
  }, []);

  const fetchBibliotecas = () => {
    axios.get('http://localhost:8080/api/biblioteca/listar')
      .then(response => setBibliotecas(response.data))
      .catch(error => console.error(error));
  };

  const buscarPorID = (id) => {
    axios.get(`http://localhost:8080/api/biblioteca/buscarBibliotecaPorID/${id}`)
      .then(response => {
        const data = response.data;
        setFormData({
          codigo: data.codigo,
          fileira: data.fileira,
          aluguel: data.aluguel,
          dataAluguel: data.dataAluguel ? 'Sim' : '',
          nome: data.nome,
          descricao: data.descricao
        });
      })
      .catch(error => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      aluguel: formData.aluguel.trim() === 'Sim' ? 'Sim' : 'Não', // Converte para 'Sim' ou 'Não'
      dataAluguel: formData.dataAluguel.trim() ? true : false // Converte para Booleano
    };

    if (!validateFormData(data)) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    const endpoint = formData.codigo
      ? `http://localhost:8080/api/biblioteca/${formData.codigo}`
      : 'http://localhost:8080/api/biblioteca/salvarBiblioteca';

    const method = formData.codigo ? 'PUT' : 'POST';

    axios({
      method: method,
      url: endpoint,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (formData.codigo) {
          setBibliotecas(prev => prev.map(b => b.codigo === formData.codigo ? response.data : b));
        } else {
          setBibliotecas(prev => [...prev, response.data]);
        }
        setFormData({
          codigo: '',
          fileira: '',
          aluguel: '', // Reinicia
          dataAluguel: '', // Reinicia
          nome: '',
          descricao: ''
        });
        setError('');
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.message || 'Erro ao processar requisição');
        } else {
          setError('Erro de rede ou servidor indisponível');
        }
      });
  };

  const validateFormData = (data) => {
    return (
      data.fileira &&
      data.nome &&
      data.descricao &&
      (data.aluguel === 'Sim' ? data.dataAluguel : true)
    );
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/biblioteca/deletarBiblioteca/${id}`)
      .then(() => setBibliotecas(prev => prev.filter(b => b.codigo !== id)))
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBuscarPorNome = () => {
    axios.get(`http://localhost:8080/api/biblioteca/buscarBibliotecaPorNome?nome=${formData.nome}`)
      .then(response => setBibliotecas(response.data))
      .catch(error => setError('Erro ao buscar bibliotecas por nome'));
  };

  return (
    <div>
      <h2>Biblioteca - Funcionário</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="fileira" 
          placeholder="Fileira" 
          value={formData.fileira} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="aluguel" 
          placeholder="Aluguel (Sim ou Não)" 
          value={formData.aluguel} 
          onChange={handleChange} 
          required 
        />
        {formData.aluguel.trim() === 'Sim' && (
          <input 
            type="text" 
            name="dataAluguel" 
            placeholder="Data de Aluguel" 
            value={formData.dataAluguel} 
            onChange={handleChange} 
            required 
          />
        )}
        <input 
          type="text" 
          name="nome" 
          placeholder="Nome" 
          value={formData.nome} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="descricao" 
          placeholder="Descrição" 
          value={formData.descricao} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">{formData.codigo ? 'Editar' : 'Adicionar'}</button>
      </form>
      <div>
        <input 
          type="text" 
          placeholder="Buscar por Nome" 
          value={formData.nome} 
          onChange={handleChange} 
          name="nome"
        />
        <button onClick={handleBuscarPorNome}>Buscar</button>
      </div>
      {error && <p>{error}</p>}
      <h3>Lista de Bibliotecas:</h3>
      <ul>
        {bibliotecas.map(b => (
          <li key={b.codigo}>
            {b.nome} - {b.descricao}
            <button onClick={() => buscarPorID(b.codigo)}>Editar</button>
            <button onClick={() => handleDelete(b.codigo)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BibliotecaFuncionario;
