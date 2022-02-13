import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginfunc } from "../redux/login";
//import { useSelector } from "react-redux";//try something

export default function Login() {
    const [user, setUser] = useState({});
    let history = useHistory();
    const dispatch = useDispatch();


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
                        console.log("dataaaa : ", data);
                        dispatch(loginfunc(data))
                        history.push('/info')
                        // window.location.replace('/info');
                        // I had a problem with "window.location.replace('/info');" that the account details
                        // from login wasnt persisted in the redux store because it reload the page.
                    })
                }
            })
        }
    }



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