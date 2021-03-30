import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { emailCheck } from '../shared/common';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

function Login(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  let confirm = true;
  if (id === '' || pwd === '') {
    confirm = true;
  } else {
    confirm = false;
  }
  const login = () => {
    if (!emailCheck(id)) {
      window.alert('이메일 형식이 맞지 않습니다!');
      return;
    }
    if (pwd.length < 8) {
      window.alert('비밀번호 형식이 맞지 않습니다!(8자리 이상)');
      return;
    }
    dispatch(userActions.loginFB(id, pwd));
  };
  return (
    <>
      <Container>
        <H1>
          로그인 <span>LOGIN</span>{' '}
        </H1>
        <br />

        <TextField
          label='이메일를 입력하세요.'
          variant='outlined'
          onChange={(e) => setId(e.target.value)}
        />
        <br />
        <TextField
          type='password'
          label='비밀번호를 입력하세요.'
          variant='outlined'
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        />
        <br />
        <br />
        <Button
          variant='contained'
          color='primary'
          disabled={confirm}
          onClick={login}
        >
          로그인
        </Button>
        <br />
        <Button
          variant='contained'
          color='default'
          onClick={() => {
            history.replace('/');
          }}
        >
          뒤로가기
        </Button>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    padding: 16px;
  }
`;

const H1 = styled.h1`
  color: #212121;
  text-align: center;
  & span {
    font-size: 16px;
    color: #99a3a4;
  }
`;

export default Login;
