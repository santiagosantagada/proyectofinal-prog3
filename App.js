import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NavPrincipal from './src/navigation/NavPrincipal';
import NavAnidada from './src/navigation/NavAnidada';
export default function App() {
  return (
    <NavigationContainer>
      <NavPrincipal />   
    </NavigationContainer>
  );
}