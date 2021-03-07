import { Constants } from '../../constants/Constants'
import { Alert } from 'react-native'
import axios from 'axios'

// Action Types

export const Types = {
    GET_CONTATOS: 'GET_CONTATOS'
}

// Reducer

const initialState = {
    contatos: []
}

export default reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_CONTATOS:
            return {
                ...state,
                contatos: action.payload
            }
        default:
            return state
    }
}

// Action Creators

export const setContatos = payload => {
    return {
        type: Types.GET_CONTATOS,
        payload: payload
    }
}

export const getContatos = () => {
    return (dispatch) => {
        axios.get(`${Constants.url}/getContatos`)
            .catch(err => {
                Alert.alert('Erro', `${err}`)
            }).then(res => {
                dispatch(setContatos(res.data))
            })
    }
}

export const editContato = (contato) => {
    return axios.put(`${Constants.url}/contato`, { contato })
}

export const addContato = (contato) => {
    return axios.post(`${Constants.url}/newContato`, { contato })
}

export const deleteContato = (id) => {
    return axios.delete(`${Constants.url}/deleteContato/${id}`)
}