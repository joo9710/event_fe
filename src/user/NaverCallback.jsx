import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function NaverCallback() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        const username = searchParams.get("username");

        if (token) {
            // 토큰 저장 및 로그인 처리
            window.sessionStorage.setItem("access_token", token);
            alert(`${username}님, 네이버 로그인 성공!`);
            navigate("/list");
        } else {
            alert("네이버 로그인 실패");
            navigate("/login");
        }
    }, []);

    return <div>네이버 로그인 처리 중...</div>;
}