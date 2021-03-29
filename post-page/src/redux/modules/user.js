import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { setCookie, deleteCookie } from '../../shared/Cookie';
import { auth } from '../../shared/firebase';
import firebase from 'firebase/app';

// actions
const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              uid: user.user.uid,
            }),
          );
          history.push('/');
        })
        .catch((err) => {
          const errCode = err.code;
          const errMessage = err.message;
          console.log(errCode, errMessage);
        });
    });
  };
};
const signupFB = (id, pwd, user_name) => {
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                uid: user.user.uid,
              }),
            );
            history.push('/');
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName,
            id: user.email,
            uid: user.uid,
          }),
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.push('/');
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie('is_login', 'success');
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie('is_login');
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState,
);

const actionCreators = {
  signupFB,
  loginFB,
  logoutFB,
  loginCheckFB,
};

export { actionCreators };
