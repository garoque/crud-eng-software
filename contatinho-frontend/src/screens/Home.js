import React, { useEffect } from 'react'
import { StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity } from 'react-native'
import { getContatos } from '../store/ducks/contato'
import { connect } from 'react-redux'
import Card from '../components/Card'
import Colors from '../../assets/styles/Colors'

function Home(props) {
    useEffect(() => {
        props.getContatos();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.content}>
                    {props.contatos.length > 0 ?
                        props.contatos.map((el) => {
                            return (
                                <TouchableOpacity key={el.id} onPress={() => props.navigation.navigate('Detalhes')}>
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
        // paddingTop: 20
    },
    content: {
        alignItems: 'center',
    }
})

const mapStateToProps = ({ contato }) => {
    return {
        contatos: contato.contatos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getContatos: () => dispatch(getContatos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)