import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Like(props) {
  const [like, setLike] = useState(false);
  const likeClick = () => {
    setLike(!like);
  };
  return (
    <>
      <IconButton aria-label='add to favorites' onClick={likeClick}>
        {like ? (
          <FavoriteIcon style={{ color: '#FFC0CB' }} />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>
    </>
  );
}

export default Like;
