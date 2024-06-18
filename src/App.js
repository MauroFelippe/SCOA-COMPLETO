import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import MenuAluno from './components/Menu/MenuAluno';
import MenuFuncionario from './components/Menu/MenuFuncionario';
import BibliotecaAluno from './components/PartesAluno/BibliotecaAluno';
import BibliotecaFuncionario from './components/PartesFuncionario/BibliotecaFuncionario';
import DisciplinaAluno from './components/PartesAluno/DisciplinaAluno';
import DisciplinaFuncionario from './components/PartesFuncionario/DisciplinaFuncionario';
import ProvaAluno from './components/PartesAluno/ProvaAluno';
import ProvaFuncionario from './components/PartesFuncionario/ProvaFuncionario';
import RecadoAluno from './components/PartesAluno/RecadoAluno';
import RecadoFuncionario from './components/PartesFuncionario/RecadoFuncionario';
import NotasAluno from './components/Notas/NotasAluno';
import NotasFuncionario from './components/Notas/NotasFuncionario';
import AdicionarPessoa from './components/PartesFuncionario/AdicionarPessoa';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menuAluno" element={<MenuAluno />} />
          <Route path="/menuFuncionario" element={<MenuFuncionario />} />
          <Route path="/biblioteca-aluno" element={<BibliotecaAluno />} />
          <Route path="/biblioteca-funcionario" element={<BibliotecaFuncionario />} />
          <Route path="/disciplina-aluno" element={<DisciplinaAluno />} />
          <Route path="/disciplina-funcionario" element={<DisciplinaFuncionario />} />
          <Route path="/prova-aluno" element={<ProvaAluno />} />
          <Route path="/prova-funcionario" element={<ProvaFuncionario />} />
          <Route path="/recado-aluno" element={<RecadoAluno />} />
          <Route path="/recado-funcionario" element={<RecadoFuncionario />} />
          <Route path="/NotasAluno" element={<NotasAluno />} />
          <Route path="/NotasFuncionario" element={<NotasFuncionario />} />
          <Route path="/adicionar-pessoa" element={<AdicionarPessoa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
