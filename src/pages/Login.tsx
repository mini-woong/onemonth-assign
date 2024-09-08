import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../lib/api/auth'
import { useUserStore } from '../store/store';

type User = {
  id: string;
  nickname: string;
  avatar: string;
};

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const handleLogin = async () => {
    const { userId, nickname, avatar } = await login({
      id: id,
      password: password,
    });
    const userInfo: User = {
      id: userId,
      nickname,
      avatar
    }
    setUser(userInfo);
    navigate("/");
  }
  return (
    <div>
      <div>
        <label htmlFor='id'>아이디</label>
        <input type='text' onChange={(e) => { setId(e.target.value) }} placeholder='아이디' />
      </div>
      <div>
        <label htmlFor='password'>패스워드</label>
        <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='비밀번호' />
      </div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => {
        navigate("/signup");
      }}>회원가입</button>
    </div>
  )
}