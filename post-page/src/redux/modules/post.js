import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import moment from 'moment';
import { firestore, storage } from '../../shared/firebase';
import { actionCreators as imageActions } from './image';

const ADD_POST = 'ADD_POST';
const GET_POST = 'GET_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
const LOADING = 'LOADING';

const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
  view_loading: false,
};

const initialPost = {
  comment: '',
  like: 0,
  insert_dt: moment().format('YYYY-MM-DD HH:mm:ss'),
};

const deletePostFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    const postDB = firestore.collection('post');
    postDB
      .doc(post_id)
      .delete()
      .then((res) => {
        dispatch(deletePost(post_id));
        history.replace('/');
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      return;
    }
    const _image = getState().image.preview;
    const _post_idx = getState().post.list.findIndex(
      (val) => val.id === post_id,
    );
    const _post = getState().post.list[_post_idx];

    const postDB = firestore.collection('post');
    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update({ ...post, insert_dt: moment().format('YYYY-MM-DD HH:mm:ss') })
        .then((doc) => {
          dispatch(
            editPost(post_id, {
              ...post,
              insert_dt: moment().format('YYYY-MM-DD HH:mm:ss'),
            }),
          );
          dispatch(imageActions.preview(null));
          history.replace('/');
        });
      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, 'data_url');

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            dispatch(imageActions.uploadImage(url));
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({
                ...post,
                image_url: url,
                insert_dt: moment().format('YYYY-MM-DD HH:mm:ss'),
              })
              .then((doc) => {
                dispatch(
                  editPost(post_id, {
                    ...post,
                    image_url: url,
                    insert_dt: moment().format('YYYY-MM-DD HH:mm:ss'),
                  }),
                );
                dispatch(imageActions.preview(null));
                history.replace('/');
              });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  };
};

const addPostFB = (comment = '', selectedValue = 'a') => {
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
      selectedValue: selectedValue,
      insert_dt: moment().format('YYYY-MM-DD HH:mm:ss'),
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
                id: doc.id,
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
const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;
    if (_paging.start && !_paging.next) {
      return;
    }
    dispatch(loading(true));
    const postDB = firestore.collection('post');

    let query = postDB.orderBy('insert_dt', 'desc');
    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];
        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null,
          size: size,
        };
        docs.forEach((doc) => {
          let _post = doc.data();
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf('user_') !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} },
          );
          post_list.push(post);
        });
        // post_list.pop();
        dispatch(getPost(post_list, paging));
      });
  };
};

const getPostOneFB = (id) => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection('post');
    postDB
      .doc(id)
      .get()
      .then((doc) => {
        let _post = doc.data();
        let post = Object.keys(_post).reduce(
          (acc, cur) => {
            if (cur.indexOf('user_') !== -1) {
              return {
                ...acc,
                user_info: { ...acc.user_info, [cur]: _post[cur] },
              };
            }
            return { ...acc, [cur]: _post[cur] };
          },
          { id: doc.id, user_info: {} },
        );
        dispatch(getPost([post]));
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
        draft.list.push(...action.payload.post_list);

        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((val) => val.id === cur.id) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((val) => val.id === cur.id)] = cur;
            return acc;
          }
        }, []);

        if (action.payload.paging) {
          draft.paging = action.payload.paging;
        }

        draft.is_loading = false;
        draft.view_loading = true;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (val) => val.id === action.payload.post_id,
        );
        draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (val) => val.id === action.payload.post_id,
        );
        draft.list.splice(idx, 1);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState,
);

const actionCreators = {
  addPostFB,
  getPostFB,
  getPostOneFB,
  editPostFB,
  deletePostFB,
  editPost,
};

export { actionCreators };
