import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://13.124.75.129:8000/users/signup", {
                email,
                username,
                password
            });

            alert(response.data.message);
            navigate("/login");
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError("이미 등록된 이메일입니다.");
            } else {
                setError("회원가입에 실패했습니다.");
            }
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="사용자 이름"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <button type="submit">가입하기</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Signup;