// import { createAction, handleActions } from 'redux-actions';
// import { produce } from 'immer';
// import { firestore } from '../../shared/firebase';
// import firebase from 'firebase/app';
// import { actionCreator as postActions } from './post';

// const LIKE = 'LIKE';
// const UNLIKE = 'UNLIKE';
// const IS_LIKE = 'IS_LIKE'

// const like = createAction(LIKE, () => ({}));
// const unlike = createAction(UNLIKE, () => ({}));
// const isLike = createAction(IS_LIKE, (is_like) => ({is_like}))

// const initialState = {
//     list: {},
//     is_like: false
// }

// const likeFB = (post_id, user_id) => {
//     return function(dispatch, getState, {history}) {
//         const likeDB = firestore.collection('like')
//         const user_info = getState().user.user
//         let _like = []
//         _like.push({post_id: user_info.uid})
//         likeDB.add(_like).then(doc => {
//             const postDB = firestore.collection('post')
//             const post = getState().post.list.find(val => val.id === post_id)
//             const increment = firebase.firestore.FieldValue.increment(1)

//         })
//     }
// }

// export default handleActions({
//   [LIKE]: (state, action) => produce(state, (draft) => {}),
//   [UNLIKE]: (state, action) => produce(state, (draft) => {}),

// });

// const actionCreators = {};

// export { actionCreators };
