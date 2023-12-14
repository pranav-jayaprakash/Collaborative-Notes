import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Login from './components/Login';
import SignUp from './components/SignUp';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import Logout from './components/Logout';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <h1>Collaborative Note App</h1>
          <Login />
          {/* <SignUp /> */}
          {/* <NoteList />
          <NoteForm />
          <Logout/> */}
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
