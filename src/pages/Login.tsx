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
    <div className='h-full content-center'>
      <div className='max-w-lg mx-auto my-auto p-5 bg-[aliceblue] rounded-lg'>
        <div className='mb-7'>
          <label className='block mb-2 text-xl font-bold' htmlFor='id'>아이디</label>
          <input className='w-full p-2 box-border' type='text' onChange={(e) => { setId(e.target.value) }} placeholder='아이디' />
        </div>
        <div className='mb-7'>
          <label className='block mb-2 text-xl font-bold' htmlFor='password'>패스워드</label>
          <input className='w-full p-2 box-border' type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='비밀번호' />
        </div>
        <button
          className='w-full p-2 bg-gradient-to-r from-[#613f89] via-[#7f83ba] to-[#b89bcb] text-white border-none rounded cursor-pointer mb-4 disabled:bg-black'
          onClick={handleLogin}
        >로그인</button>
        <button
          className='w-full p-2 bg-gray-500 text-white border-none rounded cursor-pointer'
          onClick={() => {
            navigate("/signup");
          }}>회원가입</button>
      </div>
    </div>

  )
}