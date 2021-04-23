import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fumi } from 'react-native-textinput-effects'
import Colors from '../../assets/styles/Colors'
import { formatData, formatCelular } from '../utils/Utils'
import { editContato, addContato, deleteContato } from '../store/ducks/contato'

export default function ContatoDetalhes(props) {
    const [count, setCount] = useState(1)
    const [contato, setContato] = useState({
        nome: '',
        sobrenome: '',
        telefone1: '',
        telefone2: '',
        telefone3: '',
        email: '',
        dataAniversario: '',
        id: null
    })

    useEffect(() => {
        if (props?.route?.params?.contato) {
            const { first_name, last_name, email, birthday, telefones, id } = props.route.params.contato;

            if (telefones.length == 1) {
                setContato({
                    ...contato, telefone1: telefones[0].number,
                    nome: first_name, sobrenome: last_name, id,
                    email, dataAniversario: formatData(birthday),
                })
            }

            if (telefones.length == 2) {
                setContato({
                    ...contato, telefone1: telefones[0].number, telefone2: telefones[1].number,
                    nome: first_name, sobrenome: last_name, id,
                    email, dataAniversario: formatData(birthday),
                })
            }

            if (telefones.length == 3) {
                setContato({
                    ...contato, telefone1: telefones[0].number, telefone2: telefones[1].number, telefone3: telefones[2].number,
                    nome: first_name, sobrenome: last_name, id,
                    email, dataAniversario: formatData(birthday),
                })
            }

            setCount(count + (telefones.length - 1))
        }
    }, [])

    const changeDataAniversario = value => {
        if (value.length > 10) return;

        setContato({ ...contato, dataAniversario: formatData(value) })
    }

    const saveChanges = () => {
        
        if (contato.nome.trim() == '' ||
        contato.dataAniversario == '' ||
        contato.email.trim() == '' ||
        contato.sobrenome.trim() == '' ||
        contato.telefone1 == '') {
            return Alert.alert('Atenção', 'É necessário preencher todos os campos.')
        }

        const [dia, mes, ano] = contato.dataAniversario.split('/')
        if (dia > 31 || mes > 12 || ano > 2020) {
            return Alert.alert('Atenção', 'Data de aniversário inválida.')
        }

        if (!contato.email.includes('@')) return Alert.alert('Atenção', 'É necessário informar um endereço de e-mail válido.')

        if (contato.id == null) {
            addContato(contato).catch(err => {
                Alert.alert('Atenção', 'Ocorreu um erro, tente novamente mais tarde.')
            }).then(res => {
                Alert.alert('Sucesso', 'Contato salvo com sucesso!', [
                    {
                        text: 'Voltar',
                        onPress: () => props.navigation.pop()
                    },
                ])
            })
        } else {
            editContato(contato).catch(err => {
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

    const excluirContato = () => {
        Alert.alert('Atenção', 'Tem certeza que deseja excluir esse contato?', [
            {
                text: 'SIM',
                onPress: () => confirmDelete()
            },
            {
                text: 'NÃO',
                style: 'cancel'
            },
        ])
    }

    const confirmDelete = () => {
        deleteContato(contato.id).catch(err => {
            Alert.alert('Atenção', 'Ocorreu um erro ao tentar excluir esse contato.')
        }).then(res => {
            props.navigation.pop()
        })
    }

    const removeTelefone = () => {
        setCount(count - 1)
        if (contato.telefone3 != '') {
            setContato({
                ...contato, telefone3: ''
            })
        } else if (contato.telefone2 != '' && count == 2) {
            setContato({
                ...contato, telefone2: ''
            })
        }
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.containerInputs}>
                    <Fumi label={'Nome'} iconClass={Icon} iconName={'user'} iconColor={Colors.secondary} value={contato.nome}
                        iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput}
                        onChangeText={value => setContato({ ...contato, nome: value })} />

                    <Fumi label={'Sobrenome'} iconClass={Icon} iconName={'user'} iconColor={Colors.secondary} value={contato.sobrenome}
                        iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput}
                        onChangeText={value => setContato({ ...contato, sobrenome: value })} />

                    {
                        count >= 1 ?
                            <Fumi label={`Telefone 1`} iconClass={Icon} iconName={'mobile'} iconColor={Colors.secondary} maxLength={15}
                                iconSize={30} iconWidth={40} inputPadding={16} style={styles.fumiInput} value={contato.telefone1}
                                onChangeText={value => setContato({ ...contato, telefone1: formatCelular(value) })} keyboardType='number-pad' />
                            : null
                    }

                    {
                        count >= 2 ?
                            <Fumi label={`Telefone 2`} iconClass={Icon} iconName={'mobile'} iconColor={Colors.secondary} maxLength={15}
                                iconSize={30} iconWidth={40} inputPadding={16} style={styles.fumiInput} value={contato.telefone2}
                                onChangeText={value => setContato({ ...contato, telefone2: formatCelular(value) })} keyboardType='number-pad' />
                            : null
                    }

                    {
                        count >= 3 ?
                            <Fumi label={`Telefone 3`} iconClass={Icon} iconName={'mobile'} iconColor={Colors.secondary} maxLength={15}
                                iconSize={30} iconWidth={40} inputPadding={16} style={styles.fumiInput} value={contato.telefone3}
                                onChangeText={value => setContato({ ...contato, telefone3: formatCelular(value) })} keyboardType='number-pad' />
                            : null
                    }

                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ ...styles.containerAddInputTelefone, display: count >= 3 ? 'none' : 'flex' }}>
                            <TouchableOpacity onPress={() => count <= 3 ? setCount(count + 1) : null} style={styles.addInputTelefone}>
                                <Text style={styles.btnText}>Adicionar outro telefone</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ ...styles.containerAddInputTelefone, display: count == 1 ? 'none' : 'flex' }}>
                            <TouchableOpacity onPress={() => removeTelefone()} style={{ ...styles.addInputTelefone, backgroundColor: '#FF0000' }}>
                                <Text style={styles.btnText}>Remover telefone</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Fumi label={'Email'} iconClass={Icon} iconName={'at'} iconColor={Colors.secondary} value={contato.email}
                        iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput}
                        onChangeText={value => setContato({ ...contato, email: value })} />

                    <Fumi label={'Data de aniversário'} iconClass={Icon} iconName={'calendar'} iconColor={Colors.secondary} value={contato.dataAniversario}
                        iconSize={25} iconWidth={40} inputPadding={16} style={styles.fumiInput} keyboardType='number-pad'
                        onChangeText={value => changeDataAniversario(value)} />

                    <TouchableOpacity onPress={saveChanges} style={styles.btnSalvar}>
                        <Text style={styles.btnText}>SALVAR</Text>
                    </TouchableOpacity>


                    {
                        contato.id != null ?
                            <TouchableOpacity onPress={excluirContato} style={styles.btnExcluir}>
                                <Text style={styles.btnText}>EXCLUIR</Text>
                            </TouchableOpacity>
                            : null
                    }

                </View>
            </View>
        </ScrollView>
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
        marginTop: 30,
        borderRadius: 10
    },
    btnExcluir: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.error,
        paddingVertical: 15,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 10
    },
    btnText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    },
    addInputTelefone: {
        backgroundColor: Colors.secondary,
        padding: 5,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20
    },
    containerAddInputTelefone: {
        flexDirection: 'row'
    }
})