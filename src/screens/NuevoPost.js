import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';

export default class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
    };
  }

  handleSubmit() {
    db.collection("posteos")
      .add({
        email: auth.currentUser.email,
        post: this.state.post,
        likes: 0,
        createdAt: Date.now(),
      })
      .then(() => this.props.navigation.navigate("home"))
      .catch((err) => this.setState({ err: "error en el post" }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Postear</Text>

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="¿Qué quieres postear?"
          onChangeText={(texto) => this.setState({ post: texto })}
          value={this.state.post}
        />

        <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});