import React from 'react';

import Header from './components/Header'

/** Conceitos do React:
 * Componente
 * Propriedade
 * Estado
 */

function App() {
    return (
        <>
            <Header title="Homepage">
                <ul>
                    <li>Homepage</li>
                    <li>Projetcs</li>
                </ul>
            </Header>
            <Header title="Projects">
                <ul>
                    <li>Login</li>
                </ul>
            </Header>
        </>
    );
}

export default App;