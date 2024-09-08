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
        formData.append("avatar", avatar as Blob);
        const response = await updateProfile(formData);

        if (response.success && user) {
            const uerNewInfo: User = {
                ...user,
                nickname: response.nickname as string,
                avatar: response.avatar as string
            }
            setUser(uerNewInfo);
            navigate("/");
        }
    }

    return (
        <div className="h-full content-center">
            <div className="max-w-md mx-auto my-auto p-5 bg-gray-100 rounded-lg">
                <h2>프로필 수정</h2>
                <input
                    className="w-full p-2 box-border mb-4"
                    type="text"
                    placeholder="닉네임"
                    onChange={(e) => setNickname(e.target.value)}
                />
                <input
                    className="w-full p-2 box-border mb-4"
                    type="file"
                    accept="image/*"
                    onChange={(e) => { e.target.files != null && setAvatar(e.target.files[0]) }}
                />
                <button
                    className="w-full p-2 bg-blue-500 text-white border-none rounded cursor-pointer mb-2"
                    onClick={handleUpdateProfile}
                >프로필 업데이트</button>
            </div>
        </div>

    )
}