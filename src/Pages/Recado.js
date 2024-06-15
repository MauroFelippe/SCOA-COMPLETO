import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recado = () => {
    const [recados, setRecados] = useState([]);

    useEffect(() => {
        axios.get('/api/recado/listar')
            .then(response => setRecados(response.data))
            .catch(error => console.error('Erro ao buscar recados', error));
    }, []);

    return (
        <div>
            <h1>Recado</h1>
            <ul>
                {recados.map(recado => (
                    <li key={recado.codigo}>{recado.mensagem}</li>
                ))}
            </ul>
        </div>
    );
};

export default Recado;