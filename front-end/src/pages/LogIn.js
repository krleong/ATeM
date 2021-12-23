import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import Button from '../components/Button';
import TextFieldInput from '../components/TextFieldInput';
import NavigationBar from '../components/NavigationBar';
import './LogIn.css';
import { FiLogIn } from 'react-icons/fi';

export default function LogIn() {
    useEffect(() => {
        document.title = "ATeM | Log In";  
      }, []); 

    const [logged] = React.useState(localStorage.getItem('logged')); 

    // Grabs user input from form

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [result, setResult] = React.useState(null);

    // Checks if fields are empty => if not empty, pass input to validators
    var usernameNotEmpty = false;
    var passwordNotEmpty = false;

    const handleLogIn = () => {
        // console.log("User clicked log in");

        if (username.trim() !== '') {
            usernameNotEmpty = true;
            document.getElementById('username-error').innerHTML = "";

        } else {
            console.log("Username must not be empty.");
            document.getElementById('username-error').innerHTML = "Username must not be empty.";
        }

        if (password.trim() !== '') {
            passwordNotEmpty = true;
            document.getElementById('password-error').innerHTML = "";
        } else {
            console.log("Password must not be empty.");
            document.getElementById('password-error').innerHTML = "Password must not be empty.";
        }

        if (usernameNotEmpty && passwordNotEmpty) {

            const body = {
                username: username,
                password: password,
            };
            const settings = {
                method: 'post',
                body: JSON.stringify(body),
            };
            fetch('/api/log-in', settings)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setResult(data);
                })
                .catch(console.log);
        }
    }

    if (result !== null && result.isSuccess) {
        localStorage.setItem("userid", result.id);
        localStorage.setItem("logged", true);
        localStorage.setItem("user", result.username);
        return (
            <div>
                {/* <FlashMessage duration={5000}>
                    <div id="success-msg">
                        <p> Welcome {username}</p>
                    </div>
                </FlashMessage> */}
                <Redirect to='/dashboard' /></div>
        );
    }

    return (
        logged ?
            <Redirect to="/dashboard" />
        :
        <div>
            <NavigationBar></NavigationBar>
            <div className="page-container">
                <div className="content-container">
                    <div className="form-container">
                        <h1>Log In</h1>
                        <TextFieldInput id="username-error" value={username} onChange={e => setUsername(e.target.value)} type="text" name="username" autocomplete="off">Username</TextFieldInput>
                        <TextFieldInput id="password-error" value={password} onChange={e => setPassword(e.target.value)} type="password" name="password">Password</TextFieldInput>
                        <Button buttonstyle="primary" onClick={handleLogIn} to="#"><FiLogIn /><p>Log In</p></Button>
                        {(result !== null && !result.isSuccess) && <div id="server-error-msg" className="error-msg">{result.message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}