import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { auth, db } from '../firebase/config';

export default class FormularioLogin extends Component {
   constructor(props){
       super(props);
       this.state = {
           email: '',
           password: '',
           error: ''
       };
   }

   componentDidMount(){
       auth.onAuthStateChanged((user) => {
           if (user) {
               console.log("Usuario logueado", user.email);
               this.props.navigation.navigate('anidada');
           } else {
               console.log("Usuario no logueado");
           }
       });
   }

   submit(email, password) {
       auth
           .signInWithEmailAndPassword(this.state.email, this.state.password)
           .then(() => this.props.navigation.navigate('anidada'))
           .catch(err => {
               this.setState({error: "Email o contraseña no encontrados :("})
           });
   }

   render() {
       return (
           <View style={styles.postContainer}>
               <TextInput
                   style={styles.input}
                   placeholder='Email'
                   keyboardType='email'
                   onChangeText={(email) => this.setState({ email })}
                   value={this.state.email}
               />
               <TextInput
                   style={styles.input}
                   placeholder='Password'
                   keyboardType='default'
                   onChangeText={(password) => this.setState({ password })}
                   value={this.state.password}
                   secureTextEntry
               />
               <TouchableOpacity
                   style={styles.button}
                   onPress={() => this.submit(this.state.email, this.state.password)}
               >
                   <Text style={styles.buttonText}>Iniciar Sesion</Text>
               </TouchableOpacity>
               {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
           </View>
       );
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
   input: {
       borderWidth: 1,
       borderColor: 'green',
       borderRadius: 5,
       marginBottom: 15,
       padding: 10,
       fontSize: 16,
       color: '#333',
   },
   button: {
       backgroundColor: '#6200ee',
       paddingVertical: 12,
       paddingHorizontal: 20,
       borderRadius: 5,
       marginBottom: 10,
       alignItems: 'center',
   },
   buttonText: {
       color: '#fff',
       fontSize: 16,
       fontWeight: 'bold',
   },
   errorText: {
       fontSize: 14,
       color: 'red',
       textAlign: 'center',
       marginTop: 10,
   },
});
