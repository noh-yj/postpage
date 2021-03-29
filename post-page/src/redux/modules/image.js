import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { storage } from '../../shared/firebase';

const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
const UPLOAD_LOADING = 'UPLOAD_LOADING';
const PREVIEW = 'PREVIEW';

const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({ image_url }));
const uploadLoading = createAction(UPLOAD_LOADING, (uploading) => ({
  uploading,
}));
const preview = createAction(PREVIEW, (preview) => ({ preview }));

const initialState = {
  image_url: '',
  uploading: false,
  preview: null,
};

const uploadImageFB = (image) => {
  return function (dispatch, getState, { history }) {
    dispatch(uploadLoading(true));
    const _upload = storage.ref(`images/${image.name}`).put(image);
    _upload
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          dispatch(uploadImage(url));
        });
      })
      .catch((e) => {
        dispatch(uploadLoading(false));
      });
  };
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
      }),
    [UPLOAD_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
    [PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
  },
  initialState,
);

const actionCreators = {
  uploadImageFB,
  preview,
  uploadImage,
};

export { actionCreators };
