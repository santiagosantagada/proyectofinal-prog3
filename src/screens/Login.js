import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import React, { Component } from 'react'
import FormularioLogin from '../components/FormLogin'

export default class Login extends Component {
   constructor(props){
       super(props)
   }

   componentDidMount(){
       console.log('props de la screen', this.props)
   }

   irARegister(){
       this.props.navigation.navigate('register')
   }

   render() {
       return (
         <View style={styles.container}>
           <Text style={styles.title}>Iniciar sesión</Text>
           
        
           <FormularioLogin navigation={this.props.navigation}/>

           <TouchableOpacity
               style={styles.button}
               onPress={() => this.irARegister()}
           >
               <Text style={styles.buttonText}>¿No tienes cuenta? Registrarse</Text>
           </TouchableOpacity>
         </View>
       )
   }
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#f5f5f5',
     paddingHorizontal: 30,
   },
   title: {
     fontSize: 32,
     fontWeight: 'bold',
     marginBottom: 30,
     color: '#333',
     textAlign: 'center',
   },
   button: {
     backgroundColor: '#6200ee',
     paddingVertical: 14,
     borderRadius: 8,
     marginTop: 20,
     width: '100%',
     alignItems: 'center',
   },
   buttonText: {
     color: '#fff',
     fontSize: 16,
     fontWeight: 'bold',
   },
   input: {
     width: '100%',
     padding: 12,
     borderRadius: 8,
     borderWidth: 1,
     borderColor: '#ccc',
     marginBottom: 15,
     fontSize: 16,
     backgroundColor: '#fff',
   },
   forgotPassword: {
     fontSize: 14,
     color: '#6200ee',
     textAlign: 'right',
     marginTop: 10,
   },
})
