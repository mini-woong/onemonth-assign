import axios from "axios";

const AUTH_API_HOST = 'https://moneyfulpublicpolicy.co.kr';

// 회원가입 함수의 인자 타입 정의
interface RegisterParams {
    id: string;
    password: string;
    nickname: string;
}

export const register = async ({ id, password, nickname }: RegisterParams): Promise<any> => {
    try {
        const response = await axios.post(AUTH_API_HOST + "/register", {
            id: id,
            password: password,
            nickname: nickname,
        });
        return response.data;
    } catch (error: any) {
        alert(error?.response?.data?.message);
    }
}

// 로그인 함수의 인자 타입 정의
interface LoginParams {
    id: string;
    password: string;
}

export const login = async ({ id, password }: LoginParams): Promise<any> => {
    try {
        const response = await axios.post(AUTH_API_HOST + "/login", {
            id: id,
            password: password,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data;
    } catch (error: any) {
        alert(error?.response?.data?.message);
    }
}

export const getUserInfo = async (): Promise<any> => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        try {
            const response = await axios.get(AUTH_API_HOST + "/user", {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            alert("토큰 만료");
            localStorage.clear();
        }
    }
}

// 프로필 업데이트 함수의 인자 타입 정의
export const updateProfile = async (formdata: FormData): Promise<any> => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        try {
            const response = await axios.patch(
                AUTH_API_HOST + "/profile",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            alert("토큰 만료");
            localStorage.clear();
        }
    }
}
