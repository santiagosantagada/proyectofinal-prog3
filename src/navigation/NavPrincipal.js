import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import NavAnidada from './NavAnidada'

const Stack = createNativeStackNavigator()

export default class NavPrincipal extends Component {
  render() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={Login} options={{headerShown: false}} />
            <Stack.Screen name='register' component={Register}  options={{headerShown: false}} />
            <Stack.Screen name='anidada' component={NavAnidada}  options={{headerShown: false}} />
        </Stack.Navigator>
    )
  }
}