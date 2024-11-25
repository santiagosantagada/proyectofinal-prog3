import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export default class FormularioRegister extends Component {
   constructor(props){
       super(props);
       this.state = {
           email: '',
           username: '',
           password: '',
           error: ''
       };
   }

   submit(email, username, password) {
       if (!email.includes('@')) {
           this.setState({ error: 'Ingrese un formato de email valido' });
           return;
       }

       if (username.length < 2) {
           this.setState({ error: 'Ingrese un username' });
           return;
       }


       if (password.length < 5) {
           this.setState({ error: 'Ingrese una password mas larga' });
           return;
       }

       auth.createUserWithEmailAndPassword(email, password)
           .then((user) => {
               if (user) {
                   db.collection('users').add({
                       owner: auth.currentUser.email,
                       createdAt: Date.now(),
                       username: username,
                       imagenPerfil: '',
                       arrCopados: []
                   })
                   .then(() => this.props.navigation.navigate('login'));
               }
           })
           .catch(err => {
               if (err.code === "auth/email-already-in-use") {
                   this.setState({ error: 'El email ya está en uso' });
               }
           });
   }

   render() {
       return (
           <View style={styles.container}>
               <TextInput
                   style={styles.input}
                   placeholder='Ingrese su correo'
                   keyboardType='email-address'
                   onChangeText={(text) => this.setState({ email: text, error: '' })}
                   value={this.state.email}
               />
               <TextInput
                   style={styles.input}
                   placeholder='Ingrese su username'
                   keyboardType='default'
                   onChangeText={(text) => this.setState({ username: text, error: '' })}
                   value={this.state.username}
               />
               <TextInput
                   style={styles.input}
                   placeholder='Ingrese su password'
                   keyboardType='default'
                   onChangeText={(text) => this.setState({ password: text, error: '' })}
                   value={this.state.password}
                   secureTextEntry={true}
               />
               {this.state.error !== '' && <Text style={styles.errorText}>{this.state.error}</Text>}
               <TouchableOpacity
                   style={styles.button}
                   onPress={() => this.submit(this.state.email, this.state.username, this.state.password)}
               >
                   <Text style={styles.buttonText}>Registrarse</Text>
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
       padding: 20,
       backgroundColor: '#f5f5f5'
   },
   input: {
       width: '100%',
       borderWidth: 1,
       borderColor: 'green',
       marginBottom: 15,
       padding: 12,
       borderRadius: 5,
       backgroundColor: '#fff',
       fontSize: 16
   },
   button: {
       backgroundColor: '#6200ee',
       padding: 12,
       borderRadius: 5,
       alignItems: 'center',
       width: '100%',
       marginBottom: 20
   },
   buttonText: {
       color: '#fff',
       fontWeight: 'bold',
       fontSize: 16
   },
   errorText: {
       color: 'red',
       marginBottom: 20,
       fontSize: 14
   }
});
