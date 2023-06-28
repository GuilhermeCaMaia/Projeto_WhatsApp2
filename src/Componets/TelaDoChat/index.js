import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

const API_URL = 'http://192.168.10.15:8080';

export default function TelaDoChat({ route, navigation, userID, otherUserID }) {
    const [newMessagem, setNewMessagem] = useState("");
    const [conversas, setConversas] = useState([]);
    const scrollViewRef = useRef();
    let usuario = null;

    // console.log(route.params.userID);
    // console.log(route.params.otherUserID);
    let id = route.params.userID;
    let outroId = route.params.otherUserID;
    async function carregarMensagem(id, outroId) {
        const mensagem = (await axios.get(`${API_URL}/message/buscarMensagensComUmUsuario/${id}/${outroId}`)).data;
        mensagem.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora)); //para deixar as mesgens em ordem de envio
        setConversas(mensagem);
    }

    async function enviarMessage() {
        const dados = {
            "idFrom": parseInt(route.params.userID),
            "idTo": route.params.otherUserID,
            "mensagem": newMessagem
        };
        console.log(dados);
        try {
            const response = await axios.post(`${API_URL}/message/enviarMensagem`, dados);
        } catch (erro) {
            console.log(erro);
        } finally {
            console.log(newMessagem);
            carregarMensagem(route.params.userID, route.params.otherUserID);
            setNewMessagem('');
        }
    };

    useEffect(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
        carregarMensagem(id, outroId);
    }, [conversas]);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.messageContainer}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {conversas.map(message => (
                    <View
                        key={message.id}
                        styles={[
                            styles.messageContainer,
                        ]}
                    >
                        <Text style={styles.tamanhoMensagem}>{message.mensagem}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="mensagem"
                    value={newMessagem}
                    onChangeText={text => setNewMessagem(text)}
                />
                <TouchableOpacity style={styles.sendButton}
                    onPress={enviarMessage}>
                    <Text>enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        paddingBottom: 10,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    tamanhoMensagem: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#DCF8C0',
    },
    sendButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#00FF7F',
        color: '#fff',
        borderRadius: 20,
    },
});