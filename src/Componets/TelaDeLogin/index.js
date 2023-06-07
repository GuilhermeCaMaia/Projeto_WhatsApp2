import axios from "axios";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View } from "react-native";

export default function TelaDeLogin({ navigation }) {

    const [ID, setID] = useState(null);
    const [login, setLogin] = useState(null);
    const [password, setPassword] = useState(null);
    const [hash, setHash] = useState(null);
    const API_URL = 'http://192.168.10.4:8080';

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


    const Logar = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/${login}/${password}`);
            console.log(response.data)
            let id = (String(response.data.id));
            // userIDNovo(String(response.data.ID));
            console.log((await axios.get(`${API_URL}/${id}`)).data);
            // let getHash = (await axios.get(`${API_URL}/${id}`)).data;
            // hashNovo(getHash);

            Alert.alert('Usuario logado com sucesso!');
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
    }
});