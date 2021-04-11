import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native'
import { getContatos, getContato } from '../store/ducks/contato'
import { connect } from 'react-redux'
import Card from '../components/Card'
import Colors from '../../assets/styles/Colors'

function Home(props) {
    const [text, useText] = useState('')
    useEffect(() => {
        props.navigation.addListener('focus', () => {
            props.getContatos();
        })
    }, [])

    useEffect(() => {
        if (text != '') {
            props.getContato(text);
        } else {
            props.getContatos();
        }
    }, [text])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    <TextInput
                        placeholder='Pesquisar um contato...'
                        style={styles.input}
                        onChangeText={useText}
                        value={text}
                    />
                    {props.contatos.length > 0 ?
                        props.contatos.map((el) => {
                            return (
                                <TouchableOpacity key={el.id} onPress={() => props.navigation.navigate('Contato', { contato: el })}>
                                    <Card contato={el} />
                                </TouchableOpacity>
                            )
                        })
                        : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#FFF',
        width: '100%',
        paddingTop: 12,
        paddingHorizontal: 15
    }
})

const mapStateToProps = ({ contato }) => {
    return {
        contatos: contato.contatos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getContatos: () => dispatch(getContatos()),
        getContato: (text) => dispatch(getContato(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)