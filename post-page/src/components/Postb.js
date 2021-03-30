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
        <Main>
          <Comment>{props.comment}</Comment>
          <Img src={props.image_url} alt='img' />
        </Main>
        <LikeCnt>
          <Permit>
            <Like />
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
const Main = styled.div`
  display: flex;
`;
const Comment = styled.p`
  padding: 0px 16px 0px 16px;
  margin: 0;
  width: 100px;
  height: 400px;
  overflow: auto;
  word-wrap: break-word;
`;
const Img = styled.img`
  width: 350px;
  height: 400px;
  @media only screen and (max-width: 375px) {
    width: 250px;
  }
`;
const LikeCnt = styled.p`
  padding: 10px 16px 10px 16px;

  display: flex;
  align-items: center;
  margin: 0;
`;

export default Post;
