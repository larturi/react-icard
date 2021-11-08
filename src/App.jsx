import React from 'react';
import { Navigation } from './routes';

import { ToastContainer } from 'react-toastify';

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <Navigation />

      <ToastContainer 
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={false}
      />
    </div>
  )
};

export default App;
