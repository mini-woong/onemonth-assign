import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { register } from '../lib/api/auth'

export default function Signup() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (id.length < 4 || id.length > 10) {
      alert("아이디는 4글자에서 10글자 이내로만 가능합니다.");
      return;
    }
    if (password.length < 4 || password.length > 15) {
      alert("아이디는 4글자에서 15글자 이내로만 가능합니다.");
      return;
    }
    if (nickname.length < 1 || nickname.length > 10) {
      alert("아이디는 1글자에서 10글자 이내로만 가능합니다.");
      return;
    }

    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
    });
    if (response) {
      confirm("회원가입 완료!")
      navigate("/login")
    }
  };
  return (
    <div className="h-full content-center">
      <div className="max-w-lg mx-auto p-5 bg-[aliceblue] rounded-lg">
        <div className="mb-7">
          <label className="block mb-2 text-xl font-bold" htmlFor='id'>아이디</label>
          <input className="w-full p-2 box-border" type='text' onChange={(e) => { setId(e.target.value) }} placeholder='아이디' />
        </div>
        <div className="mb-7">
          <label className="block mb-2 text-xl font-bold" htmlFor='password'>패스워드</label>
          <input className="w-full p-2 box-border" type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='비밀번호' />
        </div>
        <div className="mb-7">
          <label className="block mb-2 text-xl font-bold" htmlFor='nickname'>닉네임</label>
          <input className="w-full p-2 box-border" type='text' onChange={(e) => { setNickname(e.target.value) }} placeholder='닉네임' />
        </div>
        <button
          className="w-full p-2 bg-gradient-to-r from-[#613f89] via-[#7f83ba] to-[#b89bcb] text-white border-none rounded cursor-pointer mb-4 disabled:bg-black"
          onClick={handleRegister}>회원가입</button>
        <button
          className="w-full p-2 bg-gray-500 text-white border-none rounded cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}>돌아가기</button>
      </div>
    </div>

  );
}