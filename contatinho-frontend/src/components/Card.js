import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { formatData } from '../utils/Utils'
import Colors from '../../assets/styles/Colors'

export default function Card({ contato }) {
    console.log(contato.telefones)
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image style={{ width: 65, height: 65, borderRadius: 10 }} source={require('../../assets/images/emptyUser.png')} />

                <Text style={styles.title}>{contato.first_name}</Text>
            </View>

            <View style={{ paddingLeft: 15, paddingBottom: 15 }}>
                <Text style={styles.text}>{contato.email}</Text>
                <Text style={styles.text}>{contato.birthday}</Text>
                <Text style={styles.text}>Telefones:</Text>
                
                {
                    contato.telefones.map((elemento) => {
                        return (
                            <Text key={elemento.id} style={styles.text}>{elemento.number}</Text>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.secondary,
        width: Dimensions.get('window').width - 100,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 10
    },
    contentContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    title: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10
    },
    text: {
        color: Colors.text,
        paddingVertical: 3
    },
})