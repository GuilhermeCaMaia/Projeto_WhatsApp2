import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from "react-native";
import Lista from "../Lista";

const API_URL = 'http://192.168.10.15:8080';

export default function TelaContatos(navigation) {
    const [listarDeContatos, setListaContato] = useState([]);
    // const navigation = useNavigation();
    const userID = navigation.route.params.userID;
    const login = navigation.route.params.login;
    const nome = navigation.route.params.nome;

    console.log(navigation)
    async function carregarContatos() {

        axios.get(`${API_URL}/message/buscarUsuarios/${login}`)
            .then(response => {
                if (response.status == 200) {
                    setListaContato(response.data)
                }
            }).catch(erro => {
                setListaContato([])
                console.log(erro)
            }).finally(
                await AsyncStorage.setItem('horaAtualizacao', String(new Date()))
            );
        // if (response) {
        // if (response.status == 400) { }
        // else
        //     setListaContato(response.data);

        // navigation.navigate('Chat', { userID: id })
    }

    // function chamarDetalhes(otherID) {
    //     navigation.navigate('Chat', {otherUserID: otherID})
    // }

    async function checarMensagem() {
        let ultimaAtualizacao = await AsyncStorage.getItem('horaAtualizacao');
        // novaConverca();
        carregarContatos();
    }

    function acessarConversa(idDoOutroUsuario) {
        novaConverca(idDoOutroUsuario);
        console.log("Abrindo tela com lista de contatos")
    }

    async function novaConverca(idDoOutroUsuario) {
        const response = await axios.get(`${API_URL}/message/buscarUsuarios/${login}`)
        let id = (String(response.data.id));
        console.log(idDoOutroUsuario);
        navigation.navigation.navigate('Chat', { userID: userID, otherUserID: idDoOutroUsuario });
    }

    useEffect(() => {
        carregarContatos(userID);
        setInterval(checarMensagem, 1000 * 30 * 1);// asjustar o tempo dps
    }, [userID]);

    return (
        <View style={styles.conteiner}>
            <ScrollView>
                {listarDeContatos.map(item => {
                    if (item.id != userID)
                        return (
                            <TouchableOpacity
                                onPress={() => acessarConversa(item.id)}
                                key={item.id}
                            >
                                <Lista id={item.id} avatar={item.avatar} nome={item.nome}></Lista>
                            </TouchableOpacity>
                        );
                })}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#2F4F4F',
        alignItems: 'baseline',
    },
    usuarioImage: {
        alignItems: 'flex-start',
        backgroundColor: '#B0C4DE',
        width: 50,
        height: 50,
        marginTop: 30,
        borderRadius: 50,
    }
});