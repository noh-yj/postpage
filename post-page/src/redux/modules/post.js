import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import moment from 'moment';
import { firestore, storage } from '../../shared/firebase';
import { actionCreators as imageActions } from './image';

const ADD_POST = 'ADD_POST';
const GET_POST = 'GET_POST';

const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));

const initialState = {
  list: [],
};

const initialPost = {
  comment: '',
  like: 0,
  insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};

const addPostFB = (comment = '') => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    const user = getState().user.user;
    const user_info = {
      user_name: user.user_name,
      user_id: user.uid,
    };
    const _post = {
      ...initialPost,
      comment: comment,
      insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
    };
    const image = getState().image.preview;
    const upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(image, 'data_url');
    upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          dispatch(imageActions.uploadImage(url));
          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = {
                user_info,
                ..._post,
                post_id: doc.id,
                image_url: url,
              };
              dispatch(addPost(post));
              history.replace('/');
              dispatch(imageActions.preview(null));
            })
            .catch((e) => {
              window.alert(
                '포스트 작성에 문제가 있어요! 잠시후 다시 시도해주세요.',
              );
              console.log(e);
            });
        })
        .catch((e) => {
          window.alert(
            '이미지 업로드에 문제가 있어요! 잠시후 다시 시도해 주세요.',
          );
          console.log(e);
        });
    });
  };
};
const getPostFB = () => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    postDB.get().then((docs) => {
      let post_list = [];
      docs.forEach((doc) => {
        let _post = {
          post_id: doc.id,
          ...doc.data(),
        };
        let post = {
          post_id: doc.id,
          user_info: {
            user_name: _post.user_name,
            user_id: _post.user_id,
          },
          image_url: _post.image_url,
          comment: _post.comment,
          like: _post.like,
          insert_dt: _post.insert_dt,
        };
        post_list.push(post);
      });
      dispatch(getPost(post_list));
    });
  };
};

export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),
  },
  initialState,
);

const actionCreators = {
  addPostFB,
  getPostFB,
};

export { actionCreators };
