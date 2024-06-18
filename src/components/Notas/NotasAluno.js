// src/components/Notas/PartesAluno/NotasAluno.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotasAluno = () => {
  const [notas, setNotas] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem('codigo');
    listarNotas(id);
  }, []);

  const listarNotas = (id) => {
    axios.get('/buscarNotasPorID', { params: { codigo: id } })
      .then(response => {
        setNotas(response.data);
      })
      .catch(error => {
        console.error('Erro ao listar notas: ', error);
      });
  };

  return (
    <div>
      <h2>Notas e Faltas</h2>
      <table>
        <thead>
          <tr>
            <th>Matéria</th>
            <th>1º Bimestre</th>
            <th>Faltas</th>
            <th>2º Bimestre</th>
            <th>Faltas</th>
            <th>3º Bimestre</th>
            <th>Faltas</th>
            <th>4º Bimestre</th>
            <th>Faltas</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota, index) => (
            <tr key={index}>
              <td>{nota.materia}</td>
              <td>{nota.primeiroBimestre}</td>
              <td>{nota.faltasPrimeiroBimestre}</td>
              <td>{nota.segundoBimestre}</td>
              <td>{nota.faltasSegundoBimestre}</td>
              <td>{nota.terceiroBimestre}</td>
              <td>{nota.faltasTerceiroBimestre}</td>
              <td>{nota.quartoBimestre}</td>
              <td>{nota.faltasQuartoBimestre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotasAluno;
