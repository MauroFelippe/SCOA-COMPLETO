/*import React from 'react';
import MenuItem from './MenuItem';

const MenuFuncionario = () => (
    <ul>
        <MenuItem label="Biblioteca" path="/biblioteca" />
        <MenuItem label="Disciplina" path="/disciplina" />
        <MenuItem label="Prova" path="/prova" />
        <MenuItem label="Recado" path="/recado" />
        <MenuItem label="Inserir Item" path="/inserir" />
        <MenuItem label="Remover Item" path="/remover" />
        <MenuItem label="Editar Item" path="/editar" />
    </ul>
);

export default MenuFuncionario;*/
import React from 'react';
import './MenuFuncionario.css'; // Importe o arquivo CSS do MenuFuncionario

function MenuFuncionario() {
  return (
    <div className="menu-funcionario">
      <h2>Menu do Funcionário</h2>
      <ul>
        <li><a href="/biblioteca">Biblioteca</a></li>
        <li><a href="/disciplina">Disciplina</a></li>
        <li><a href="/prova">Prova</a></li>
        <li><a href="/recado">Recado</a></li>
        <li><a href="/inserir">Inserir</a></li>
        <li><a href="/remover">Remover</a></li>
        <li><a href="/editar">Editar</a></li>
      </ul>
    </div>
  );
}

export default MenuFuncionario;