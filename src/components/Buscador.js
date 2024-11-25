import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';

export default class Buscador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valorInput: ""
        };
    }

    controlador(text) {
        this.setState({
            valorInput: text
        }, () => this.props.filtrarUsuarios(this.state.valorInput));
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Buscar...'
                    keyboardType='default'
                    onChangeText={(text) => this.controlador(text)}
                    value={this.state.valorInput}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.props.filtrarUsuarios(this.state.valorInput)}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'green',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
