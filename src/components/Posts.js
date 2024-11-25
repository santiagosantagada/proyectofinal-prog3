import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/config'
import firebase from 'firebase'

export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            estaMiLike: false,
        }
    }
    componentDidMount(){
        
    }

    darLike() {
        db
        .collection('posteos')
        .doc(this.props.item.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => this.setState({ estaMiLike: true }))
    }

    quitarLike() {
        db
        .collection('posteos')
        .doc(this.props.item.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => this.setState({ estaMiLike: false }))
    }

    render() {
        return (
            <View style={styles.postContainer}>
                <Text style={styles.email}>{this.props.item.data.email}</Text>
                <Text style={styles.postText}>{this.props.item.data.post}</Text>
                <Text style={styles.likes}>Likes: {this.props.item.data.likes.length}</Text>
                {
                    this.state.estaMiLike ?
                        <TouchableOpacity
                            style={styles.likeButton}
                            onPress={() => this.quitarLike()}
                        >
                            <Text style={styles.likeButtonText}>Quitar like</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity
                            style={styles.likeButton}
                            onPress={() => this.darLike()}
                        >
                            <Text style={styles.likeButtonText}>Dar like</Text>
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
    },
    email: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    postText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    likes: {
        fontSize: 14,
        color: '#999',
        marginBottom: 10,
    },
    likeButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    likeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
})
