import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Icon } from 'react-native-elements'
import Home from '../screens/Home'
import Contato from '../screens/ContatoDetalhes'
import ContatoForm from '../screens/ContatoForm'
import Colors from '../../assets/styles/Colors'

const Stack = createStackNavigator()

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Lista de contatos'
                screenOptions={screenOptions}>
                <Stack.Screen name='Lista de contatos' component={Home}
                    options={({ navigation }) => {
                        return {
                            headerRight: () => (
                                <Button 
                                    onPress={() => navigation.navigate('Formulário de contato')}
                                    type='clear'
                                    icon={<Icon name="add" size={25} color={Colors.text} />}
                                />
                            )
                        }
                    }} />
                <Stack.Screen name='Detalhes' component={Contato} />
                <Stack.Screen name='Formulário de contato' component={ContatoForm} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: Colors.secondary,
    },
    headerTintColor: Colors.text,
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}