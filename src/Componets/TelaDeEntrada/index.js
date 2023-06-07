import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { TelaDeCadastro } from "../TelaDeCadastro";
import { Component } from "react";


const Stack = createStackNavigator();
export default function TelaDeEntrada({ navigation }) {

    return (
        <View>
            <View>
                <Button style={styles.botao}
                    title="Cadastrar"
                    onPress={() => navigation.navigate('Cadastrar')}
                />
                <Button style={styles.botao}
                    title="Login"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    botao: {
        flex: 1,
        backgroundColor: '#00FF7F',
        color: '#FFFAFA',
        width: '50%',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});