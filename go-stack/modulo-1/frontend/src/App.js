import React, { useState } from 'react';

import './App.css';
import backgroundImage from './assets/background.jpg';

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

    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);

    function handleAddProject() {
        setProjects([...projects, `Novo projeto ${Date.now()}`]);
    }

    return (
        <>
            <Header title="Projects" />
            <img width={500} src={backgroundImage} alt="background" />
            <ul>
                {projects.map(project => <li key={project}>{project}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}

export default App;