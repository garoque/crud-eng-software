import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../../assets/styles/Colors'

export default function Card() {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Gabriel</Text>
            </View>

            <View style={{ paddingLeft: 15, paddingBottom: 15 }}>
                <Text style={styles.text}>Tel. principal: (42) 99950-7994</Text>
                <Text style={styles.text}>gfroque1@gmail.com</Text>
                <Text style={styles.text}>10/02/2000</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        width: Dimensions.get('window').width - 100,
        borderRadius: 20
    },
    contentContainer: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    title: {
        color: Colors.text,
        fontWeight: 'bold',
        fontSize: 20
    },
    text: {
        color: Colors.text,
        paddingVertical: 3
    }
})