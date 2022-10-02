import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App/App'
import './index.css'
import { FronteggProvider } from '@frontegg/react'

const contextOptions = {
  baseUrl: 'https://app-vdz3fft6ii03.frontegg.com',
  clientId: '1177503c-b7e6-476c-b5a7-7517049a763c'
}

ReactDOM.render(
    <React.StrictMode>
        <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
            <App />
        </FronteggProvider>
    </React.StrictMode>,
    document.getElementById('root')
)