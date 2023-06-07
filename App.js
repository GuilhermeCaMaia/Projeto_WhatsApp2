import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import MyStack from './src/Componets/MyStack';
import { createStackNavigator } from '@react-navigation/stack';
import TelaDeEntrada from './src/Componets/TelaDeEntrada';
import TelaDeLogin from './src/Componets/TelaDeLogin';
import { TelaDeCadastro } from './src/Componets/TelaDeCadastro';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      {/* colocara o nome que identifica a tela */}
      <Stack.Screen name='Entrada' component={TelaDeEntrada} />
      <Stack.Screen name="Login" component={TelaDeLogin} />
      <Stack.Screen name="Cadastrar" component={TelaDeCadastro} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  botao: {
    flex: 1,
    backgroundColor: '#00FF7F',
    color: '#FFFAFA'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
