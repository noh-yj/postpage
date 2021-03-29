import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imageActions } from '../redux/modules/image';

function Image(props) {
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.image.uploading);
  const fileInput = useRef();

  const selectFile = () => {
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.preview(reader.result));
    };
  };
  return (
    <>
      <input
        type='file'
        ref={fileInput}
        onChange={selectFile}
        disabled={uploading}
      />
    </>
  );
}

export default Image;
