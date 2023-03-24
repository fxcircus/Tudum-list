import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App/App'
import './index.css'
import { FronteggProvider } from '@frontegg/react'

const contextOptions = {
  baseUrl: 'https://app-xc8za2zctoa2.frontegg.com',
  clientId: 'b9271712-961b-4c4f-aed3-b059c42f4cd6'
}

ReactDOM.render(
        <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
            <App />
        </FronteggProvider>,
    document.getElementById('root')
)