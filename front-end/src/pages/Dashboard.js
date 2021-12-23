import React from 'react';
import { useEffect } from "react";
import './Dashboard.css';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button'
import HorizontalCard from '../components/HorizontalCard';
import { FiDollarSign } from "react-icons/fi";
import Loader from "../components/Loader";

export default function Dashboard() {
    const [paymentJSON, setPaymentData] = React.useState([]);
    const [userBalance, setUserBalance] = React.useState();
    const [alreadyLoaded, setLoaded] = React.useState(false);
    useEffect(() => {
        document.title = "ATeM | Dashboard";
    }, []);

    const [username] = React.useState(localStorage.getItem('user'));

    const getBalance = () => {
        const settings = {
            method: 'get',
            headers: {
                username: username,
            },
        };
        fetch('/api/get-user-balance', settings)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // console.log(data.balance);
                setUserBalance(data.balance);
            })
            .catch(console.log);
    }

    const getPayments = () => {
        const settings = {
            method: 'get',
            headers: {
                username: username,
            },
        };
        fetch('/api/get-user-transactions', settings)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // console.log(data.listOfPayments);
                setPaymentData(data.listOfPayments);
                // console.log(paymentJSON);
                setLoaded(true);
            })
            .catch(console.log);
    } 

    return (
        <div>
            {getBalance()}
            {alreadyLoaded ? console.log("loaded") : getPayments()}
            <NavigationBar></NavigationBar>
            <div className="dashboard-page-container">
                <div className="content-container">
                    <div className="user-profile">
                        <img src="../assets/pfp.jpeg" alt="User's avatar" />
                        <h1>Hello, {username}.</h1>
                        <div className="user-balance">
                            <p id="balance-desc">Account balance</p>
                            <p id="balance-number">${userBalance}</p>
                            <div className="user-actions">
                                <Button to="/maketransaction"><FiDollarSign /><p>Send/Request Money</p></Button>
                            </div>
                        </div>
                    </div>
                    <div className="user-transactions">
                        <h1>Transaction History</h1>
                        {!alreadyLoaded && <Loader></Loader>}
                        {/* <Card id="user-transaction-card" paymentType={2} usernameA={"usernameA"} usernameB={"usernameB"} timeDate={"timeDate"} paymentNotes={"paymentNotes"} amount={"amount"}></Card> */}
                        {paymentJSON.map((data, key) =>
                        <HorizontalCard key={key} paymentType={data.transactionType} usernameA={data.usernameA} usernameB={data.usernameB} timeDate={data.timeStamp} paymentNotes={data.description} amount={data.amount.toFixed(2)}></HorizontalCard>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
}