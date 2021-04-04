import React from 'react';
import ReactDOM from 'react-dom';
import SamuraiJSApp from './App';

it('renders without crashing', () => {
  const div = MainApp.createElement('div');
  ReactDOM.render(<SamuraiJSApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});