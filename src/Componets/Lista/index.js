import { Image, Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function Lista(item) {

    console.log(item)
    return (
        <View style={styles.container}>
            <Image style={styles.usuarioFoto}
                source={{ uri: 'data:image/jpeg;base64,' + item.avatar }}
            />
            <View >
                <Text style={styles.campoNome}>{item.nome}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        height: 60,
        backgroundColor: '#363636',
        borderRadius: 10,
        paddingHorizontal: 50,
        fontSize: 16,
        alignItems: 'center',
        justifyContent: 'flex-start',
        elevation: 20,
        shadowOpacity: 20,
    },
    nomeContainer: {
        width: '78%',
        height: '100%',
        marginLeft: 25,
        marginBottom: 25,
        justifyContent: 'center',

    },
    campoNome: {
        color: "#FFF",
        width: '100%',
        height: '50%',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5
    },
    usuarioFoto: {
        alignItems: 'flex-start',
        backgroundColor: '#B0C4DE',
        width: 50,
        height: 50,
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        borderRadius: 50,
    },
});