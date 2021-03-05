import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Icon } from 'react-native-elements'
import Home from '../screens/Home'
import Contato from '../screens/ContatoDetalhes'
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
                                    onPress={() => navigation.navigate('Contato')}
                                    type='clear'
                                    icon={<Icon name="add" size={25} color={Colors.text} />}
                                />
                            )
                        }
                    }} />
                <Stack.Screen name='Contato' component={Contato} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const screenOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,
    },
    headerTintColor: Colors.text,
    headerTitleStyle: {
        fontWeight: 'bold'
    }
}