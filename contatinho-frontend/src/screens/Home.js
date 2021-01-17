import React from 'react'
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native'
import Card from '../components/Card'
import Colors from '../../assets/styles/Colors'

export default function Home({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <TouchableOpacity onPress={() => navigation.navigate('Detalhes')}>
                        <Card />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 20
    },
    content: {
        alignItems: 'center',
    }
})