import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Disciplina = () => {
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        axios.get('/api/disciplina/listar')
            .then(response => setDisciplinas(response.data))
            .catch(error => console.error('Erro ao buscar disciplinas', error));
    }, []);

    return (
        <div>
            <h1>Disciplina</h1>
            <ul>
                {disciplinas.map(disciplina => (
                    <li key={disciplina.codigo}>{disciplina.nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default Disciplina;