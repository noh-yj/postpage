import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';

function PostDetail(props) {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const id = props.match.params.id;
  const post_idx = post_list.findIndex((val) => val.post_id === id);
  const post = post_list[post_idx];
  useEffect(() => {
    dispatch(postActions.getPostFB());
  }, []);
  return <Post {...post} />;
}

export default PostDetail;
