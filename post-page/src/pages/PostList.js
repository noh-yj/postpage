import React, { useEffect } from 'react';
import styled from 'styled-components';
import Post from '../components/Post';
import Postb from '../components/Postb';
import Postc from '../components/Postc';
import InfinityScroll from '../shared/InfinityScroll';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import Spinner from '../shared/Spinner';

function PostList(props) {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  const view_loading = useSelector((state) => state.post.view_loading);
  console.log(view_loading);

  useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {view_loading ? (
        <InfinityScroll
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((val) => {
            return (
              <Wrap
                onClick={() => {
                  history.push(`/detail/${val.id}`);
                }}
                key={val.id}
              >
                {val.selectedValue === 'a' ? (
                  <Post {...val} />
                ) : val.selectedValue === 'b' ? (
                  <Postb {...val} />
                ) : val.selectedValue === 'c' ? (
                  <Postc {...val} />
                ) : null}
              </Wrap>
            );
          })}
        </InfinityScroll>
      ) : (
        <Spinner />
      )}
    </>
  );
}

const Wrap = styled.div`
  max-width: 500px;
  margin: 12px auto;
`;

export default PostList;
