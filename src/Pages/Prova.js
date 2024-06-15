import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Prova = () => {
    const [provas, setProvas] = useState([]);

    useEffect(() => {
        axios.get('/api/prova/listar')
            .then(response => setProvas(response.data))
            .catch(error => console.error('Erro ao buscar provas', error));
    }, []);

    return (
        <div>
            <h1>Prova</h1>
            <ul>
                {provas.map(prova => (
                    <li key={prova.codigo}>{prova.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default Prova;