import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css'

import { DAppProvider } from "@usedapp/core";

ReactDOM.render(
  <React.StrictMode>
     <DAppProvider config={{}}>
      <App />
    </DAppProvider>  </React.StrictMode>,
  document.getElementById('root')
);

