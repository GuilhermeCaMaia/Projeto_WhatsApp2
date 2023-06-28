import axios from "axios";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View } from "react-native";

export default function TelaDeLogin({ navigation }) {

    const [ID, setID] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [hash, setHash] = useState(null);
    const [foto, setFoto] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const API_URL = 'http://192.168.10.15:8080'; // ip da maquina

    function userIDNovo(id) {
        setID(id);
    }

    function hashNovo(hash) {
        setHash(hash)
    }

    function loginNovo(login) {
        setLogin(login);
    }

    function passwordNovo(senha) {
        setPassword(senha);
    }

    function fotoDoUsuario(foto) {
        setFoto(foto);
    }


    const Logar = async () => {

        try {
            const response = await axios.get(`${API_URL}/user/${login}/${password}`);
            console.log(response.data)
            let id = (String(response.data.id));

            Alert.alert('Usuario logado com sucesso!');
            console.log('Usuario logado com sucesso!');
            console.log(id);
            navigation.navigate('Contatos', { userID: id, login: response.data.telefone, nome: response.data.nome })
        } catch (error) {
            console.error('erro ao logar! ', error);
        }

    }

    return (
        <View style={styles.corpo}>
            <View>
                <Text style={styles.testo}>E-mail ou telefone do usuário</Text>
                <TextInput style={styles.container}
                    onChangeText={loginNovo}
                />
                <Text style={styles.testo}>Senha:</Text>
                <TextInput style={styles.container}
                    onChangeText={passwordNovo}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.botao}
                    onPress={Logar}>
                    <Text style={styles.testoBotao}>Logar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    corpo: {
        flex: 1,
        padding: 24,
        backgroundColor: '#2F4F4F'
    },
    testo: {
        color: '#B0C4DE',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50
    },
    container: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#363636',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,

    },
    botao: {
        marginTop: 10,
        height: 60,
        backgroundColor: '#00FF7F',
        borderRadius: 10,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        shadowOpacity: 20,
        shadowColor: "#051a10"
    },
    testoBotao: {
        color: '#FFFAFA',
        fontWeight: 'bold'
    },
    foto: {
        alignItems: 'center',
        backgroundColor: '#B0C4DE',
        width: 100,
        height: 100,
        marginTop: 30,
        borderRadius: 50,
    },
});