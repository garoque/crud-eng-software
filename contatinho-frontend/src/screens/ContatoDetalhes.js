import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Fumi } from 'react-native-textinput-effects'
import DateTimePicker from '@react-native-community/datetimepicker'
import Colors from '../../assets/styles/Colors'
import { formatData } from '../utils/Utils'

export default function ContatoDetalhes() {
    const [date, setDate] = useState('01/01/2000')
    const [dateObj, setDateObj] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateObj
        const convertedDate = formatData(currentDate.toISOString().substring(0, 10))

        setShow(Platform.OS === 'ios')
        setDateObj(currentDate)
        setDate(convertedDate)
    }

    const showDatePicker = () => {
        setShow(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInputs}>
                <Fumi label={'Nome'} iconClass={Icon} iconName={'user'} iconColor={Colors.secondary}
                    iconSize={25} iconWidth={40} inputPadding={16} />

                <Fumi label={'Sobrenome'} iconClass={Icon} iconName={'user'} iconColor={Colors.secondary}
                    iconSize={25} iconWidth={40} inputPadding={16} />

                <Fumi label={'Telefone'} iconClass={Icon} iconName={'mobile'} iconColor={Colors.secondary}
                    iconSize={30} iconWidth={40} inputPadding={16} />

                <Fumi label={'Email'} iconClass={Icon} iconName={'at'} iconColor={Colors.secondary}
                    iconSize={25} iconWidth={40} inputPadding={16} />
            </View>

            <TouchableOpacity style={styles.changeData} onPress={showDatePicker}>
                <Text style={styles.text}>Informar data de aniversário</Text>
            </TouchableOpacity>

            <View style={styles.containerInputs}>
                <Fumi label={'Data de aniversário'} iconClass={Icon} iconName={'calendar'} iconColor={Colors.secondary}
                    iconSize={25} iconWidth={40} inputPadding={16} editable={false} value={date} />
            </View>

            {show && (
                <DateTimePicker value={dateObj} onChange={onChange} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    containerInputs: {
        width: '100%',
        backgroundColor: '#FFF'
    },
    containerData: {
        width: Dimensions.get('window').width - 150,
    },
    changeData: {
        backgroundColor: Colors.primary,
        marginVertical: 20,
        padding: 10,
        borderRadius: 20
    },
    text: {
        color: Colors.text,

    }
})