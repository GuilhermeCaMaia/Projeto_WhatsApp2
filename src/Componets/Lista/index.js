import { Image, Text } from "react-native";
import { StyleSheet, View } from "react-native";

export default function Lista(item) {

    console.log(item)
    return (
        <View style={styles.container}>
            <Image style={styles.usuarioFoto}
                source={{ uri: 'data:image/jpeg;base64,' + item.avatar }}
            // source={props.avatar ? { uri: `data:image/png;base64,${props.avatar}` } : require('../../../assets/photoIcon.png')}
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
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopColor: '#000',
        borderTopWidth: 2,
        marginBottom: 5
    },
    nomeContainer: {
        width: '78%',
        height: '100%',
        marginLeft: 20,
        justifyContent: 'center',

    },
    campoNome: {
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
        marginTop: 30,
        borderRadius: 50,
    },
});