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
    <div>
      <div>
        <label htmlFor='id'>아이디</label>
        <input type='text' onChange={(e) => { setId(e.target.value) }} placeholder='아이디' />
      </div>
      <div>
        <label htmlFor='password'>패스워드</label>
        <input type='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='비밀번호' />
      </div>
      <div>
        <label htmlFor='nickname'>닉네임</label>
        <input type='text' onChange={(e) => { setNickname(e.target.value) }} placeholder='닉네임' />
      </div>
      <button onClick={handleRegister}>회원가입</button>
      <button onClick={() => {
        navigate("/login");
      }}>돌아가기</button>
    </div>
  );
}