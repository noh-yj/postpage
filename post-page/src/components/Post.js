import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Permit from '../shared/Permit';

function Post(props) {
  return (
    <>
      <Container>
        <Header>
          <UserInfo>
            <Avatar>{props.user_info.user_name[0].toUpperCase()}</Avatar>
            <UserName>{props.user_info.user_name}</UserName>
          </UserInfo>
          <p>{props.insert_dt}</p>
        </Header>
        <Comment>{props.comment}</Comment>
        <Img src={props.image_url} alt='img' />
        <Like>
          <Permit>
            <IconButton aria-label='add to favorites'>
              <FavoriteIcon style={{ color: '#FFC0CB' }} />
            </IconButton>
          </Permit>
          좋아요 {props.like} 개
        </Like>
      </Container>
    </>
  );
}
const Container = styled.div`
  max-width: 500px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  border: 3px groove #eee;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;
const UserName = styled.p`
  margin-left: 8px;
`;
const Comment = styled.p`
  padding: 4px 16px 4px 16px;
  box-sizing: border-box;
`;
const Img = styled.img`
  width: 100%;
  height: 400px;
`;
const Like = styled.p`
  padding: 10px 16px 10px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0;
`;

export default Post;
