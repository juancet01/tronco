import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
    return (
        <View style={s.container}>
            <Text style={s.titulo}>Splinter flights</Text>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        backgroundColor: "#14303E",
        height: 110,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#F9F9ED"
    }
})