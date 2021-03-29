import React, { useEffect } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

function PostList(props) {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  // const user_info = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(postActions.getPostFB());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {post_list.map((val) => {
        return (
          <Wrap
            onClick={() => {
              history.push(`/detail/${val.post_id}`);
            }}
          >
            <Post key={val.post_id} {...val} />
          </Wrap>
        );
      })}
    </>
  );
}

const Wrap = styled.div``;

export default PostList;
