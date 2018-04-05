import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../../src/main';

// ReactDOM is responsible for updating the DOM to match React elements
ReactDOM.render(<Main {...window.__INITIAL_STATE__} />, document.querySelector('main'));
