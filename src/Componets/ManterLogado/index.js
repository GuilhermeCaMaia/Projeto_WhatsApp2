import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const API_URL = 'http://192.168.10.15:8080';

export const gravarUser = (nome, email, telefone, senha) => {
    const item = {
        "nome": nome,
        "email": email,
        "telefone": telefone,
        "senha": senha
    }
    console.log(item);
    axios.post(`${ip}/user/`, item).then((res) => {
        console.log(res)
    }).catch((erro) => {
        console.log(erro)
    })
}

const sauvarUserData = async (data) => {
    await AsyncStorage.setItem("usario", JSON.stringify(data)).catch((erro) => {
        throw erro;
    });
};

export const ManterUsuarioLogado = async (telefone, senha) => {
    try {
        const { data: response } = await axios.get(`${ip}/user/${telefone}/${senha}`)
        console.log(response)

        await sauvarUserData(response);

        return response
    } catch (erro) {
        console.log(erro)
    }
}

export const Hash = async (id) => {
    try {
        const { data: response } = await axios.get(`${ip}/user/${id}`)
        console.log(response)
        return response
    } catch (erro) {
        console.log(erro)
    }
}