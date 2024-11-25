import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import FormularioRegister from '../components/FormRegister';

export default class Register extends Component {
   constructor(props){
       super(props);
   }

   irAlLogin(){
       this.props.navigation.navigate('login');
   }


   render() {
       return (
           <View style={styles.container}>
               <Text style={styles.title}>Register</Text>
               <FormularioRegister navigation={this.props.navigation} />
               
               <TouchableOpacity
                   style={styles.button}
                   onPress={() => this.irAlLogin()}
               >
                   <Text style={styles.buttonText}>Ir a iniciar sesión</Text>
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
       padding: 20
   },
   title: {
       fontSize: 32,           
       fontWeight: 'bold',      
       marginBottom: 30,        
       color: '#333',          
   },
   button: {
       backgroundColor: '#6200ee',
       paddingVertical: 12,
       paddingHorizontal: 20,
       borderRadius: 5,
       alignItems: 'center',
       marginTop: 20,
       width: '100%',
   },
   buttonText: {
       color: '#fff',
       fontSize: 18,
       fontWeight: 'bold',
   }
});
