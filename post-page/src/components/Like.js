import React, { useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as likeActions } from '../redux/modules/like';
import { history } from '../redux/configureStore';

function Like(props) {
  const dispatch = useDispatch();
  let is_like = useSelector((state) => state.like.is_like);
  // const like_list = useSelector((state) => state.like.list);
  const post_id = history.location.pathname.split('/')[2];
  const user_id = useSelector((state) => state.user.user.uid);
  useEffect(() => {
    dispatch(likeActions.getLikeFB(post_id, user_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!post_id) {
    return null;
  }
  const likeClick = () => {
    if (!is_like) {
      dispatch(likeActions.likeFB(post_id, user_id));
    } else if (is_like) {
      dispatch(likeActions.unlikeFB(post_id, user_id));
    }
  };
  return (
    <>
      <IconButton aria-label='add to favorites' onClick={likeClick}>
        {is_like ? (
          <FavoriteIcon style={{ color: '#FFC0CB' }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </>
  );
}

export default Like;
