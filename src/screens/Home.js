import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db } from '../firebase/config'
import { FlatList } from 'react-native-web'
import Posts from '../components/Posts'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        db
        .collection("posteos")
        .orderBy("createdAt", "desc")
        .limit(5)
        .onSnapshot(docs => {
            let arrayDocs = []
            docs.forEach((doc) => {
                arrayDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            this.setState({
                todos: arrayDocs
            },
            () => console.log("state", this.state))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.partedearriba}>Todos los posteos</Text>

                {this.state.todos.length === 0
                ?
                (<Text style={styles.partedearriba}>No hay posteos!</Text>)
                :
                <FlatList
                    data={this.state.todos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Posts item={item} />}
                />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    partedearriba: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
})
