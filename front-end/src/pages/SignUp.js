//Step 1: Import React
import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom'
import TextFieldInput from '../components/TextFieldInput';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './SignUp.css';
import { FiUserPlus } from 'react-icons/fi';
// import FlashMessage from 'react-flash-message'

//Step 2: create a component function that reutrns an elemnt

export default function SignUp() {
    useEffect(() => {
        document.title = "ATeM | Sign Up";
    }, []);
    
    const [logged] = React.useState(localStorage.getItem('logged')); 

    // Grabs user input from form
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [result, setResult] = React.useState(null);

    // Checks if fields are valid => if not invalid, pass input to server
    let usernameValid = false;
    // let emailValid = false;
    let passwordValid = false;
    let passwordSame = false;

    function validateUsername(usernameInput) {
        let trimmedUsername = usernameInput.trim();
        setUsername(trimmedUsername);
        const beginWithAZ = /^[A-Za-z]/;
        // const threePlusAlphaNum = /(.*[A-Za-z0-9]){3}/g;
        
        let test1 = beginWithAZ.test(trimmedUsername.charAt(0));
        // let test2 = threePlusAlphaNum.test(username);
        let test2 = (trimmedUsername.includes(' '));
        
        document.getElementById('username-error').innerHTML = "";
        //console.log("Validate Username: [" + trimmedUsername + "]", test1, test2);
        usernameValid = test1 && !test2;
        if (!test1) {
            console.log("Username must start with a letter.");
            document.getElementById('username-error').insertAdjacentHTML('afterbegin', "<p>Username must start with a letter.</p>");
        } 
        if (test2) {
            console.log("Username must not contain any spaces.");
            document.getElementById('username-error').insertAdjacentHTML('afterbegin', "<p>Username must not contain any spaces.</p>");
        }
        console.log("Username valid: " + usernameValid);
        return (test1 && !test2);
        
    }

    function validateEmail(emailInput) {
        let trimmedEmail = emailInput.trim();
        setEmail(trimmedEmail);
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        
        let test1 = regex.test(trimmedEmail);
        document.getElementById('email-error').innerHTML = "";
        //console.log(`Validate Email: [${trimmedEmail}]`, test1);
        if (!test1) {
            console.log("Email is invalid.");
            document.getElementById('email-error').insertAdjacentHTML('afterbegin', "<p>Email is invalid.</p>");
        }
        // console.log("Email valid: " + emailValid);
        return test1;
    }

    function validatePassword(passwordInput) {
        let trimmedPassword = passwordInput.trim();
        setPassword(trimmedPassword);
        const containUpper = /[A-Z]+/g;
        const containNum = /\d+/g;
        const containSpecial = /[/*\-+!@#$^&]+/g;

        let test1 = containUpper.test(trimmedPassword);
        let test2 = containNum.test(trimmedPassword);
        let test3 = containSpecial.test(trimmedPassword);
        let test4 = (trimmedPassword.length >= 8);

        document.getElementById('password-error').innerHTML = "";
        //console.log(`Validate Password: [${trimmedPassword}]`, test1, test2, test4);
        if (!test1) {
            document.getElementById('password-error').insertAdjacentHTML('afterbegin', "<p>Password must contain an uppercase letter.</p>");
        } 
        if (!test2) {
            document.getElementById('password-error').insertAdjacentHTML('afterbegin', "<p>Password must contain a number.</p>");
        } 
        if (!test3) {
            document.getElementById('password-error').insertAdjacentHTML('afterbegin', "<p>Password must contain a special character.</p>");
        } 
        if (!test4) {
            document.getElementById('password-error').insertAdjacentHTML('afterbegin', "<p>Password must be 8 characters or longer.</p>");
        }
        console.log("Password valid: " + passwordValid);
        return (test1 && test2 && test3 && test4);
    }

    function passwordsMatch(confirmPassword) {
        let trimmedConfirmPassword = confirmPassword.trim();
        setConfirmPassword(trimmedConfirmPassword);
        passwordSame = (password === trimmedConfirmPassword);
        //console.log(password + " : " + trimmedConfirmPassword);
        // console.log("PW SAME TEST: " + passwordSame);
        document.getElementById('confirm-password-error').innerHTML = "";
        if (!passwordSame) {
            document.getElementById('confirm-password-error').insertAdjacentHTML('afterbegin', "<p>Passwords do not match.</p>");
        }
        return passwordSame;
    };

    function handleSignUp() {

        // console.log("Submit validation: ", validateUsername(username), validateEmail(email), validatePassword(password), passwordsMatch(confirmPassword));
        if (validateUsername(username) && validateEmail(email) && validatePassword(password) && passwordsMatch(confirmPassword)) {
            // console.log("ALL INPUT VALID, PUSH TO SERVER");
            const body = {
                username: username,
                password: password,
                email: email,
            };

            const setting = {
                method: 'post',
                body: JSON.stringify(body),
            };
            fetch('/api/sign-up', setting) //built in
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setResult(data);
                })
                .catch(console.log); // async try/catch
        }
    };

    if (result !== null && result.isSuccess) {
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
            <Redirect to="/feed" />
        :
        <div>
            <NavigationBar></NavigationBar>
            <div className="page-container">
                <div className="content-container">
                    <div className="form-container">
                        <h1>Sign Up</h1>
                        <TextFieldInput
                            id="username-error"
                            type="text"
                            name="username"
                            value={username}
                            autocomplete="off"
                            onChange={e => validateUsername(e.target.value)}
                            required>Username</TextFieldInput>
                        <TextFieldInput
                            id="email-error"
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => validateEmail(e.target.value)}
                            autocomplete="off"
                            required>Email</TextFieldInput>
                        <TextFieldInput
                            id="password-error"
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => validatePassword(e.target.value)}
                            required>Password</TextFieldInput>
                        <TextFieldInput
                            id="confirm-password-error"
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={e => passwordsMatch(e.target.value)}
                            required>Confirm Password</TextFieldInput>
                        <Button buttonstyle="primary" onClick={handleSignUp} to="#" ><FiUserPlus /><p>Sign Up</p></Button>
                        {/* <input type="button" onClick={handleSignUp} disabled="true" value="DoSomething"></input> */}
                        {(result !== null && !result.isSuccess) && <div id="server-error-msg" className="error-msg">{result.message}</div>}
                    </div>
                </div>
            </div>

        </div>
    );
};
