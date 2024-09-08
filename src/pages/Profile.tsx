import { useState } from "react";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";

type User = {
    id: string;
    nickname: string;
    avatar: string;
  };

export default function Profile() {
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const navigate = useNavigate();
    const { user, setUser } = useUserStore();

    const handleUpdateProfile = async () => {
        const formData = new FormData();
        formData.append("nickname", nickname);
        formData.append("avatar", avatar);
        const response = await updateProfile(formData);

        if(response.success) {
            const uerNewInfo: User = {
                ...user,
                nickname: response.nickname,
                avatar: response.avatar
            }
            setUser(uerNewInfo);
            navigate("/");
        }
    }

    return (
        <div>
            <h2>프로필 수정</h2>
                <input
                    type="text"
                    placeholder="닉네임"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {e.target.files != null && setAvatar(e.target.files[0])}}
                />
            <button onClick={handleUpdateProfile}>프로필 업데이트</button>
        </div>
    )
}