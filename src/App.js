import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import MenuAluno from './components/Menu/MenuAluno'; // Certifique-se de ter este componente importado
import MenuFuncionario from './components/Menu/MenuFuncionario'; // Certifique-se de ter este componente importado

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/menuAluno" element={<MenuAluno />} />
          <Route path="/menuFuncionario" element={<MenuFuncionario />} />
          {/* Adicione outras rotas necessárias */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;