/*import React from 'react';
import MenuItem from './MenuItem';

const MenuAluno = () => (
    <div>
        <h2>Menu do Aluno</h2>
        <ul>
            <MenuItem label="Biblioteca" path="/biblioteca" />
            <MenuItem label="Disciplina" path="/disciplina" />
            <MenuItem label="Prova" path="/prova" />
            <MenuItem label="Recado" path="/recado" />
        </ul>
    </div>
);

export default MenuAluno;*/
import React from 'react';
import './MenuAluno.css'; // Importe o arquivo CSS do MenuAluno

function MenuAluno() {
  return (
    <div className="menu-aluno">
      <h2>Menu do Aluno</h2>
      <ul>
        <li><a href="/biblioteca">Biblioteca</a></li>
        <li><a href="/disciplina">Disciplina</a></li>
        <li><a href="/prova">Prova</a></li>
        <li><a href="/recado">Recado</a></li>
      </ul>
    </div>
  );
}

export default MenuAluno;