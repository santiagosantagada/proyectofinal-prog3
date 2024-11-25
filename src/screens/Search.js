import { Text, View, FlatList, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db } from '../firebase/config';
import Buscador from '../components/Buscador';  

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            usuarioBackUp: [],
            error: ""
        };
    }

    componentDidMount() {
        db.collection('users').onSnapshot((docs) => {
            let arrDocs = [];

            docs.forEach((doc) => arrDocs.push({
                id: doc.id,
                data: doc.data()
            }));

            this.setState({
                users: arrDocs,
                usuarioBackUp: arrDocs 
            });

        });
    }

    filtrarUsuarios(user) {
        const usuarioFiltrado = this.state.usuarioBackUp.filter((elm) =>
            elm.data.username.toLowerCase().includes(user.toLowerCase())
        );

        if (usuarioFiltrado.length === 0) {
            this.setState({
                users: [],
                error: "El usuario no existe"
            });
        } else {
            this.setState({
                users: usuarioFiltrado,
                error: ""
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Estos son todos los usuarios creados</Text>

                <Buscador filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} />

                {this.state.error ? (
                    <Text style={styles.errorText}>{this.state.error}</Text>
                ) : (
                    <FlatList
                        data={this.state.users}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.userItem}>
                                <Text style={styles.username}>{item.data.username}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 5,
        width: '100%',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
