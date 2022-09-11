import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js'
import './global.module.scss'
import {Provider} from 'react-redux'
import { configureStore } from './redux/Store'
import {MantineProvider} from '@mantine/core'

const theme = {
  breakpoints: {
    xs: 380,
    sm: 448,
    md: 800,
    lg: 1200,
    xl: 1440,
  }
}
ReactDOM.render(
  <Provider store={configureStore()}>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </Provider>
, document.getElementById('root')
)