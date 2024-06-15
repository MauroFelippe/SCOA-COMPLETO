import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Biblioteca = () => {
    const [bibliotecas, setBibliotecas] = useState([]);

    useEffect(() => {
        axios.get('/api/biblioteca/listar')
            .then(response => setBibliotecas(response.data))
            .catch(error => console.error('Erro ao buscar bibliotecas', error));
    }, []);

    return (
        <div>
            <h1>Biblioteca</h1>
            <ul>
                {bibliotecas.map(biblioteca => (
                    <li key={biblioteca.codigo}>{biblioteca.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default Biblioteca;