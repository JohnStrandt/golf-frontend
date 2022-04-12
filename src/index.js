
import React from 'react';
import ReactDOM from 'react-dom';

import GlobalStyles from "./components/GlobalStyles";
import App from './App';

const index = (

  <div>
    <React.StrictMode>
      <GlobalStyles />  
        <App />
    </React.StrictMode>
  </div>
);


ReactDOM.render(index, document.getElementById('root'));
