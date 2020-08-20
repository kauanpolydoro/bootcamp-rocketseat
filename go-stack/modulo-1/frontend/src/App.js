import React, { useState, useEffect } from 'react';
import api from './services/api.js';

import './App.css';

import Header from './components/Header'

/** Conceitos do React:
 * Componente
 * Propriedade
 * Estado & Imutabilidade
 */

function App() {

    /**
     * useState retorna um array com 2 posições
    
     1. Variável com seu valor inicial
     2. Função para atualizarmos esse valor

     */

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    async function handleAddProject() {
        //setProjects([...projects, `Novo projeto ${Date.now()}`]);

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Kauan Polydoro"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects" />
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;