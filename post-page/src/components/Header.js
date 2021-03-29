import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { history } from '../redux/configureStore';
import { actionCreators as userActions } from '../redux/modules/user';
import { useDispatch, useSelector } from 'react-redux';
import { apiKey } from '../shared/firebase';

function Header(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  if (user.is_login && is_session) {
    const user_name = user.user.user_name;
    return (
      <>
        <Container>
          <Button
            variant='outlined'
            style={{ color: '#eee' }}
            onClick={() => {
              history.push('/');
            }}
          >
            Hanghae
          </Button>
          <BtnContainer>
            <P>{user_name}님 환영합니다 :)</P>

            <Button
              variant='outlined'
              style={{ color: '#eee' }}
              onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            >
              <ExitToAppIcon />
            </Button>
          </BtnContainer>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container>
        <Button
          variant='outlined'
          style={{ color: '#eee' }}
          onClick={() => {
            history.push('/');
          }}
        >
          Hanghae
        </Button>
        <BtnContainer>
          <Button
            variant='outlined'
            style={{ color: '#eee' }}
            onClick={() => {
              history.push('/login');
            }}
          >
            로그인
          </Button>
          <Button
            variant='outlined'
            style={{ color: '#eee' }}
            onClick={() => {
              history.push('/signup');
            }}
          >
            회원가입
          </Button>
        </BtnContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  padding: 20px;
  box-sizing: border-box;
  background: #212121;
  height: 76px;
  @media only screen and (max-width: 768px) {
    padding: 0px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  margin-right: 25px;
  @media only screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;
const P = styled.p`
  color: #fff;
  margin: 0;
  padding: 16px 0;
  font-size: 14px;
`;

export default Header;
