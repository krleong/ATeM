import React, { useEffect } from "react";
import './Feed.css';
import Card from '../components/Card';
import NavigationBar from '../components/NavigationBar';
import { FiUsers } from "react-icons/fi";
import Loader from "../components/Loader";

export default function Feed() {
    const [paymentJSON, setPaymentData] = React.useState([]);
    const [alreadyLoaded, setLoaded] = React.useState(false);
    useEffect(() => {
        document.title = "ATeM | Feed";
    }, []);

    const getPayments = () => {
        const settings = {
            method: 'get',
            headers: {
                'Size': 0,
            },
        };
        fetch('/api/get-public-transactions', settings)
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

    // var usernameA = "Person 1";
    // var usernameB = "Person 2";
    // var paymentType = Math.round(Math.random()) + 1;

    // var time = new Date().toLocaleTimeString(undefined, {
    //     hour: '2-digit',
    //     minute: '2-digit',
    // });;

    // var timeFormatted = time.replace(/^0(?:0:0?)?/, '');

    // var date = new Date().toLocaleDateString('en-US');
    // var timeDate = timeFormatted + ' ' + date;

    // var paymentNotes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

    // var amount = "$" + Math.round(Math.random() * 100) + ".00"; // REMOVE ".00" later

    // const testSomething = (usernameA, usernameB) => {
    //     return (
    //         alert("TESTING")
    //     );

    // };

    return (
        <div>
            {alreadyLoaded ? console.log("loaded") : getPayments()}
            <NavigationBar></NavigationBar>
            <div className="feed-page-container">
                <div className="feed-header"><FiUsers id="users-icon" /><h1>Public Transactions</h1></div>
                {!alreadyLoaded && <Loader></Loader>}
                <div className="card-container">
                    {/* <FeedGrid></FeedGrid> */}

                    {paymentJSON.map((data, key) =>
                        <Card key={key} paymentType={data.transactionType} usernameA={data.usernameA} usernameB={data.usernameB} timeDate={data.timeStamp} paymentNotes={data.description} amount={data.amount.toFixed(2)}></Card>
                    )}


                    {/* <Card paymentType={paymentType} usernameA={usernameA} usernameB={usernameB} timeDate={timeDate} paymentNotes={paymentNotes} amount={amount}></Card>
                    <Card paymentType={paymentType} usernameA={usernameA} usernameB={usernameB} timeDate={timeDate} paymentNotes={paymentNotes} amount={amount}></Card>

                    <Card paymentType={paymentType} usernameA={usernameA} usernameB={usernameB} timeDate={timeDate} paymentNotes={paymentNotes} amount={amount}></Card>
                    <Card paymentType={paymentType} usernameA={usernameA} usernameB={usernameB} timeDate={timeDate} paymentNotes={paymentNotes} amount={amount}></Card>
                    <Card paymentType={paymentType} usernameA={usernameA} usernameB={usernameB} timeDate={timeDate} paymentNotes={paymentNotes} amount={amount}></Card>
                    <Card paymentType={paymentType} usernameA={usernameA} usernameB={usernameB} timeDate={timeDate} paymentNotes={paymentNotes} amount={amount}></Card>
                    <Card paymentType={paymentType} usernameA={usernameA} usernameB={usernameB} timeDate={timeDate} paymentNotes={paymentNotes} amount={amount}></Card> */}

                </div>
            </div>
        </div>
    );
};