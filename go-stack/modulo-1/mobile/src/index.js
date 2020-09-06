import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

//Nenhum elemento possui valor semântico (significado)
//Não possuem estilização própria
//Todos os componentes possuem por padrão "display: flex"

//View: div, footer, header, main, aside, section... Qualquer tipo de container
//Text: p, span, strong, h1, h2, h3

export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data)
        });
    }, [])

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Kauan Polydoro'
        })

        const project = response.data;

        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor='#7159c1' />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                />

                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleAddProject}
                >
                    <Text>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#FFF',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
});