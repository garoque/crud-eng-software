import { registerRootComponent } from 'expo'
import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store/storeConfig'
import App from './App'

const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

registerRootComponent(Redux)