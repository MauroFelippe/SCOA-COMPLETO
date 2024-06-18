import React from 'react';
import { Link } from 'react-router-dom';
import './MenuFuncionario.css';

function MenuFuncionario() {
  return (
    <div className="menu-funcionario">
      <h2>Menu Funcionário</h2>
      <ul>
        <li><Link to="/biblioteca-funcionario">Biblioteca</Link></li>
        <li><Link to="/disciplina-funcionario">Disciplina</Link></li>
        <li><Link to="/prova-funcionario">Prova</Link></li>
        <li><Link to="/recado-funcionario">Recado</Link></li>
        <li><Link to="/NotasFuncionario">Notas</Link></li>
        <li><Link to="/adicionar-pessoa">Adicionar Aluno ou Funcionário</Link></li>
        
      </ul>
    </div>
  );
}

export default MenuFuncionario;