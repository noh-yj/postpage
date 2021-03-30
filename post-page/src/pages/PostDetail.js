import React, { useEffect } from 'react';
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

  return <>{post && <Post {...post} />}</>;
}

export default PostDetail;
