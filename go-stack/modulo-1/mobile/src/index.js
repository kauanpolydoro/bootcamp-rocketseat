import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

//Nenhum elemento possui valor semântico (significado)
//Não possuem estilização própria
//Todos os componentes possuem por padrão "display: flex"

//View: div, footer, header, main, aside, section... Qualquer tipo de container
//Text: p, span, strong, h1, h2, h3

export default function App() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor='#7159c1' />
            <View style={styles.container}>
                <Text style={styles.title}>Hello World</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
});