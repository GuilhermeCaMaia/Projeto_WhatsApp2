
import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";

const API_URL = 'http://192.168.10.5:8080';

export default function TelaDoChat({ navigation, userID, otherUserID }) {
    const [newMessagem, setNewMessagem] = useState(null);
    const [conversas, setConversas] = useState(null);

    async function carregarMensagem(id, otherId) {
        const mensagem = (await axios.get(`${API_URL}/message/buscarMensagensComUmUsuario/${id}/${otherId}`)).data;
    }

    async function enviarMessage() {
        const dados = {
            "idFrom": parseInt(userID),
            "idTo": otherUserID,
            "mensagem": newMessagem
        };
        console, log(dados);
        try {
            const response = await axios.post(`${API_URL}/message/enviarMensagem`, dados);
        } catch (erro) {
            console.log(erro);
        } finally {
            console.log(newMessagem);
            carregarMensagem(userID, otherUserID);
            setNewMessagem('');
        }
    };

    useEffect(() => {

        carregarMensagem(userID, otherUserID);
    }, [conversas]);

    return (
        <View>
            <ScrollView

            >
                {conversas.map(message => (
                    <View
                        key={message.id}
                        styles={[
                            styles.messageContainer,
                            message.from.id == userID ? styles.rightAlign : styles.leftAlign
                        ]}
                    >
                        <Text style={styles.messageText}>{message.mensagem}</Text>
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
    messagesContainer: {
        flexGrow: 1,
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    leftAlign: {
        alignSelf: 'flex-start',
        backgroundColor: '#F2F2F2',
    },
    rightAlign: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C0',
    },
    messageText: {
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
    },
    sendButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});