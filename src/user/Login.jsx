import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const inputRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = e => setUsername(e.target.value);
    const changePassword = e => setPassword(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();

        axios
            // .post("http://43.203.230.234:8000/users/signin/",
            // .post("http://localhost:9000/users/signin/", 
            .post("http://13.124.75.129:8000/users/signin/",                 
                { username, password },
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    // 메시지를 출력 -> 토큰을 저장 -> 이벤트 목록으로 이동
                    alert(res.data.message);
                    window.sessionStorage.setItem("access_token", res.data.access_token);
                    navigate("/list");
                }
            })
            .catch(err => {
                console.log(err);
                if (err.status === 401 || err.status === 404) {
                    alert("로그인에 실패했습니다.\n" + err.response.data.detail);
                } else {
                    alert("로그인에 실패했습니다.");
                }
                setUsername('');
                setPassword('');
                inputRef.current.focus();
            });
    };

        // 네이버 아이디로 로그인하기 위한 URL
    const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=TWPtaTxalBGseiuREViw&redirect_uri=http://13.124.75.129:8000/users/auth/naver/callback&state=randomstate";

        
    return (
        <>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} type="text" value={username} onChange={changeUsername} placeholder="이메일을 입력하세요." />
                <input type="password" value={password} onChange={changePassword} placeholder="패스워드를 입력하세요." />
                <button type="submit">로그인</button>
            </form>

            <button
                type="button"
                onClick={() => window.location.href = NAVER_AUTH_URL}
                style={{ backgroundColor: "#03C75A", color: "white", padding: "10px", marginTop: "10px" }}
            >
                네이버 아이디로 로그인
            </button>
        </>
    );
}