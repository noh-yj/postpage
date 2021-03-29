import React, { useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';
import { useDispatch } from 'react-redux';
import { apiKey } from './firebase';
import { actionCreators as userActions } from '../redux/modules/user';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import Header from '../components/Header';
import Permit from './Permit';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import PostList from '../pages/PostList';
import PostUpload from '../pages/PostUpload';
import PostDetail from '../pages/PostDetail';

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
        <Route path='/upload' exact component={PostUpload} />
        <Route path='/detail/:id' exact component={PostDetail} />
        <Route path='/' exact>
          <PostList />
          <Permit>
            <BtnPosition>
              <Fab
                color='primary'
                aria-label='add'
                onClick={() => {
                  history.push('/upload');
                }}
              >
                <AddIcon />
              </Fab>
            </BtnPosition>
          </Permit>
        </Route>
      </ConnectedRouter>
    </>
  );
}
const BtnPosition = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 10;
  @media only screen and (max-width: 768px) {
    right: 10px;
  }
`;

export default App;
