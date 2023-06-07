import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export function TelaDeCadastro({ navigation }) {

    const [id, setID] = useState(null);
    const [nome, setNome] = useState(null);
    const [apelido, setApelido] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [senha, setSenha] = useState(null);
    const [email, setEmail] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [hash, setHash] = useState(null);
    const API_URL = 'http://192.168.10.4:8080';

    // id
    // nome
    // apelido
    // avatar
    // senha
    // email
    // telefone
    // hash

    function novoID() {
        setID(new data().getMilliseconds);
    }
    function nomeNovo(nome) {
        setNome(nome);
    }
    function apelidoNovo(apelido) {
        setApelido(apelido);
    }
    function senhaNovo(senha) {
        setSenha(senha);
    }
    function emailNovo(email) {
        setEmail(email);
    }
    function telefoneNovo(telefone) {
        setTelefone(telefone);
    }

    const botaoCadastrar = async () => {
        try {
            const response = await axios.post(`${API_URL}/user/`, {
                nome: nome,
                apelido: apelido,
                // avatar: avatar,
                senha: senha,
                email: email,
                telefone: telefone
            });

            console.log(response.config.data);
            navigation.navigate('Login')
            Alert.alert('Usuario cadastrado com sucesso!');

        } catch (error) {
            console.error('Erro no cadastrar:', error);
        }
    }

    return (
        <View style={styles.corpo}>
            <View>
                <ScrollView>
                    <View>
                        <Text style={styles.testo}>Apelido:</Text>
                        <TextInput style={styles.container}
                            onChangeText={apelidoNovo}
                        ></TextInput>
                        <Text style={styles.testo}>Nome:</Text>
                        <TextInput style={styles.container}
                            onChangeText={nomeNovo}
                        ></TextInput>
                        <Text style={styles.testo}>Senha:</Text>
                        <TextInput style={styles.container}
                            onChangeText={senhaNovo}
                        ></TextInput>
                        <Text style={styles.testo}>E-Mail:</Text>
                        <TextInput style={styles.container}
                            onChangeText={emailNovo}
                        ></TextInput>
                        <Text style={styles.testo}>Telefone:</Text>
                        <TextInput style={styles.container}
                            onChangeText={telefoneNovo}
                        ></TextInput>
                        {/* avatar */}

                        <TouchableOpacity
                            style={styles.botao}
                            onPress={botaoCadastrar}>
                            <Text style={styles.testoBotao}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
