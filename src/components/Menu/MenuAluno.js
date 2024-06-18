import React from 'react';
import { Link } from 'react-router-dom';
import './MenuAluno.css';

function MenuAluno() {
  return (
    <div className="menu-aluno">
      <h2>Menu Aluno</h2>
      <ul>
        <li><Link to="/biblioteca-aluno">Biblioteca</Link></li>
        <li><Link to="/disciplina-aluno">Disciplina</Link></li>
        <li><Link to="/prova-aluno">Prova</Link></li>
        <li><Link to="/recado-aluno">Recado</Link></li>
        <li><Link to="/NotasAluno">Notas</Link></li>
      </ul>
    </div>
  );
}

export default MenuAluno;
