import React from 'react';
import ReactDOM from 'react-dom';

// apollo
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const Bootstrap = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(<Bootstrap />, document.getElementById('root'));
registerServiceWorker();
