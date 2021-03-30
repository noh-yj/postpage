import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Image from '../components/Image';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imageActions } from '../redux/modules/image';

function PostUpload(props) {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.image.preview);
  const is_login = useSelector((state) => state.user.is_login);
  const post_list = useSelector((state) => state.post.list);
  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;
  const { history } = props;

  let _post = is_edit ? post_list.find((val) => val.id === post_id) : null;
  const [comment, setComment] = useState(_post ? _post.comment : '');

  useEffect(() => {
    if (is_edit && !_post) {
      history.goBack();
      return;
    }
    if (is_edit) {
      dispatch(imageActions.preview(_post.image_url));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let confirm = true;
  if (comment === '' || preview === null) {
    confirm = true;
  } else {
    confirm = false;
  }
  const addPost = () => {
    dispatch(postActions.addPostFB(comment));
  };
  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { comment: comment }));
  };
  if (!is_login) {
    window.alert('잘못된 경로입니다');
    history.goBack();
  }

  return (
    <>
      <Container>
        <Header>
          <h1>
            <BorderColorIcon /> &nbsp;
            {is_edit ? '게시글 수정하기' : '게시글 작성하기'}
          </h1>
          <Image />
          <br />
          <br />
        </Header>
        <Img
          src={
            preview
              ? preview
              : 'https://www.smallwoods.org.uk/assets/Uploads/Documents/ac72cd8e0a/product-default-img__FitMaxWzEwMDAsODAwXQ.jpg'
          }
          alt='img'
        />
        <TextField
          label='내용을 입력해주세요.'
          value={comment}
          multiline
          rows={5}
          variant='outlined'
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <br />
        {is_edit ? (
          <Button
            variant='contained'
            color='primary'
            disabled={confirm}
            onClick={editPost}
          >
            게시글 수정하기
          </Button>
        ) : (
          <Button
            variant='contained'
            color='primary'
            disabled={confirm}
            onClick={addPost}
          >
            게시글 작성하기
          </Button>
        )}
        <br />
        <Button
          variant='contained'
          onClick={() => {
            dispatch(imageActions.preview(null));
            history.goBack();
          }}
        >
          뒤로가기
        </Button>
      </Container>
    </>
  );
}
const Container = styled.div`
  max-width: 500px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  & h1 {
    text-align: center;
    color: #af7ac5;
  }

  @media only screen and (max-width: 375px) {
    & h1 {
      font-size: 24px;
      margin: 8px 0 8px 0;
    }
  }
`;
const Header = styled.div`
  padding: 8px;
  box-sizing: border-box;
`;
const Img = styled.img`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
  @media only screen and (max-width: 375px) {
    height: 300px;
  }
`;
export default PostUpload;
