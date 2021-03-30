import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';

function PostDetail(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const user_info = useSelector((state) => state.user.user);
  const post_list = useSelector((state) => state.post.list);
  const post_idx = post_list.findIndex((val) => val.id === id);
  const post = post_list[post_idx];

  useEffect(() => {
    if (post) {
      return;
    }
    dispatch(postActions.getPostOneFB(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {post && <Post {...post} />}

      {post && user_info?.uid === post.user_info.user_id ? (
        <Container>
          <Button
            variant='contained'
            size='large'
            color='primary'
            onClick={() => {
              props.history.push(`/edit/${id}`);
            }}
          >
            수정하기
          </Button>
          <br />
          <Button
            variant='contained'
            size='large'
            color='secondary'
            onClick={() => {
              dispatch(postActions.deletePostFB(id));
            }}
          >
            삭제하기
          </Button>
        </Container>
      ) : null}
    </>
  );
}

const Container = styled.div`
  max-width: 500px;
  margin: 30px auto;
  padding: 0 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & Button {
    width: 45%;
  }
`;

export default PostDetail;
