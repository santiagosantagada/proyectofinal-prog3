import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Search from '../screens/Search';
import NuevoPost from '../screens/NuevoPost';

const Tab = createBottomTabNavigator()

export default class NavAnidada extends Component {
  render() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name='home' 
            component={Home} 
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
            }}/>

            <Tab.Screen 
            name='profile' 
            component={Profile}  
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
            }}/>

            <Tab.Screen 
            name='buscador' 
            component={Search}  
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="search" size={24} color="black" />
            }}/>

            <Tab.Screen 
            name='nuevo' 
            component={NuevoPost}  
            options={{
                headerShown: false,
                tabBarIcon: () => <FontAwesome name="plus" size={24} color="black" />
            }}/>
        </Tab.Navigator>
    )
  }
}
