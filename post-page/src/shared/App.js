import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { apiKey } from './firebase';
import { actionCreators as userActions } from '../redux/modules/user';
import Header from '../components/Header';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Permit from './Permit';

function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <ConnectedRouter history={history}>
        <Route path='/login' exact component={Login} />
        <Route path='/signup' exact component={SignUp} />
      </ConnectedRouter>
    </>
  );
}

export default App;
