import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Permit from '../shared/Permit';
import Like from './Like';

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
        <LikeCnt>
          <Permit>
            <Like {...props} />
          </Permit>
          좋아요 {props.like} 개
        </LikeCnt>
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
  word-wrap: break-word;
`;
const Img = styled.img`
  width: 100%;
  height: 400px;
`;
const LikeCnt = styled.p`
  padding: 10px 16px 10px 16px;

  display: flex;
  align-items: center;
  margin: 0;
`;

export default Post;
