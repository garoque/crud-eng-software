import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fumi } from 'react-native-textinput-effects'
import Colors from '../../assets/styles/Colors'
import { formatData } from '../utils/Utils'
import { editContato, addContato } from '../store/ducks/contato'

export default function ContatoDetalhes(props) {
    const [contato, setContato] = useState({
        nome: '',
        sobrenome: '',
        telefone: '',
        email: '',
        dataAniversario: '',
        id: null
    })

    useEffect(() => {
        if (props?.route?.params?.contato) {
            const { first_name, last_name, email, birthday, number, id } = props.route.params.contato;

            setContato({
                ...contato,
                nome: first_name, sobrenome: last_name, id,
                telefone: number, email, dataAniversario: formatData(birthday),
            })
        }
    }, [])

    const changeDataAniversario = value => {
        if (value.length > 10) return;

        setContato({ ...contato, dataAniversario: formatData(value) })
    }

    const saveChanges = () => {
        if (contato.id == null) {
            addContato(contato).catch(err => {
                Alert.alert('Atenção', 'Ocorreu um erro, tente novamente mais tarde.')
            }).then(res => {
                console.log(res)
                Alert.alert('Sucesso', 'Contato salvo com sucesso!', [
                    {
                        text: 'Voltar',
                        onPress: () => props.navigation.pop()
                    },
                ])
            })
        } else {
            editContato(contato, contato.id).catch(err => {
                Alert.alert('Atenção', 'Ocorreu um erro, tente novamente mais tarde.')
            }).then(res => {
                Alert.alert('Sucesso', 'Alterações realizada com sucesso!', [
                    {
                        text: 'Voltar',
                        onPress: () => props.navigation.pop()
                    },
                ])
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInputs}>
                <Fumi label={'Nome'} iconClass={Icon} iconName={'user'} iconColor={Colors.secondary} value={contato.nome}
                    iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput}
                    onChangeText={value => setContato({ ...contato, nome: value })} />

                <Fumi label={'Sobrenome'} iconClass={Icon} iconName={'user'} iconColor={Colors.secondary} value={contato.sobrenome}
                    iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput}
                    onChangeText={value => setContato({ ...contato, sobrenome: value })} />

                <Fumi label={'Telefone'} iconClass={Icon} iconName={'mobile'} iconColor={Colors.secondary} value={contato.telefone}
                    iconSize={30} iconWidth={40} inputPadding={16} style={styles.fumiInput}
                    onChangeText={value => setContato({ ...contato, telefone: value })} />

                <Fumi label={'Email'} iconClass={Icon} iconName={'at'} iconColor={Colors.secondary} value={contato.email}
                    iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput}
                    onChangeText={value => setContato({ ...contato, email: value })} />

                <Fumi label={'Data de aniversário'} iconClass={Icon} iconName={'calendar'} iconColor={Colors.secondary} value={contato.dataAniversario}
                    iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput} keyboardType='number-pad'
                    onChangeText={value => changeDataAniversario(value)} />

                <TouchableOpacity onPress={saveChanges} style={styles.btnSalvar}>
                    <Text style={styles.btnText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
    },
    containerInputs: {
        width: '100%',
        marginVertical: 20
    },
    fumiInput: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10
    },
    btnSalvar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginTop: 40,
        borderRadius: 10
    },
    btnText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    }
})