//Step 1: Import React
import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import './Home.css';
import Button from '../components/Button'
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';
import { FiLogIn, FiUserPlus } from 'react-icons/fi'

//Step 2: create a component function that reutrns an elemnt

export default function Home(props) {
    const [paymentJSON, setPaymentData] = React.useState([]);
    const [alreadyLoaded, setLoaded] = React.useState(false);
    useEffect(() => {
        document.title = "ATeM | Home";
    }, []);

    const { id } = useParams()
    const [userState, setUserState] = useState(false)

    const usernameGet = () => {
        fetch('/api/sign-up') //built in
            .then(res => res.json())
    }

    const getPayments = () => {
        const settings = {
            method: 'get',
            headers: {
                'Size' : 4,
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

    return (
        <div>
            {alreadyLoaded ? console.log("loaded") : getPayments()}
            <NavigationBar></NavigationBar>
            <div className="home-page-container">
                <div className="home-container">
                    <div className="home-section" id="image-div">
                        <img src="../assets/simu_liu.jpeg" alt="3 happy customers sitting in front of a laptop using ATeM Payment Service" />
                        <div className="site-greeting">
                            <h1>Totally Not Sus!</h1>
                            <p className="site-desc">We are a totally legitimate social payment platform. We are committed to user privacy and won't spy on your data for the sake of making more money through advertistements. 😏</p>
                            <div className="action-container">
                                <h3>Join Now!</h3>
                                <div className="action-buttons">
                                    <Button to="/login"><FiLogIn /><p>Log In</p></Button>
                                    <Button buttonstyle="primary" to="/signup"><FiUserPlus /><p>Sign Up</p></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-section" id="home-feed-container">
                        <div className="feed-info">
                            <h3>See what others are doing!</h3>
                            <Button to="/feed">View Feed</Button>
                        </div>
                        <div className="feed-mini">
                        {paymentJSON.map((data, key) => 
                            <Card key={key} paymentType={data.transactionType} usernameA={data.usernameA} usernameB={data.usernameB} timeDate={data.timeStamp} paymentNotes={data.description} amount={data.amount.toFixed(2)}></Card>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};