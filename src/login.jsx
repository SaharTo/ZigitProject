import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState({});
    let history = useHistory();


    const handleChange = ({ target }) => {
        const field = target.id;
        const value = target.value;
        user[field] = value;
        setUser(user);
    };


    const login = (ev) => {
        ev.preventDefault();
        if (user.password && user.email) {
            fetch(`https://private-052d6-testapi4528.apiary-mock.com/authenticate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user }),
            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        sessionStorage.setItem('Team', JSON.stringify(data[0].personalDetails.Team));
                        sessionStorage.setItem("avatar", JSON.stringify(data[0].personalDetails.avatar));
                        sessionStorage.setItem("joinedAt", JSON.stringify(data[0].personalDetails.joinedAt));
                        sessionStorage.setItem("name", JSON.stringify(data[0].personalDetails.name));
                        sessionStorage.setItem("token", JSON.stringify(data[0].token));

                        window.location.replace('/info');

                    });
                } else res.text().then((data) => alert(data));
            });
        } else alert("נא להזין אימייל וסיסמא");
    };


    return (
        <div>
            <h1 className='mainTitle'>Zigit Assignment</h1>
            <h1 className='mainTitle'>By</h1>
            <h1 className='mainTitle'>Sahar Toledano</h1>
            <form className="loginForm" autoComplete="off" onSubmit={login}>
                <h1 className="loginTitle">Login</h1>
                <input
                    autoComplete="off"
                    type="email"
                    id="email"
                    className="loginInput"
                    onChange={handleChange}
                    placeholder="email"
                    lang="en"
                    title="Invalid email. Please check it again"

                />
                <input
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className="loginInput"
                    onChange={handleChange}
                    placeholder="password"

                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    lang="en"
                    title="The Password must contain 8 characters in English include: a digit, a lower-case letter and an upper-case letter"
                />
                <button className="loginBtn" >Login</button>

            </form>
        </div>
    );
}