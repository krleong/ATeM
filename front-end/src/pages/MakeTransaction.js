import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom'
import './MakeTransaction.css';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import TextFieldInput from '../components/TextFieldInput';
import CheckboxInput from '../components/CheckboxInput';
import { FiArrowRightCircle } from 'react-icons/fi';

export default function MakeTransaction(props) {
    useEffect(() => {
        document.title = "ATeM | Make Payment";
    }, []);

    const [username] = React.useState(localStorage.getItem('user'));
    const [amount, setAmount] = React.useState('');
    const [recipient, setRecipient] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [payType, setPayType] = React.useState('');
    const [makePublic, setPublic] = React.useState('');
    const [result, setResult] = React.useState(null);

    var time = new Date().toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });;

    var timeFormatted = time.replace(/^0(?:0:0?)?/, '');

    var date = new Date().toLocaleDateString('en-US');
    var timeDate = timeFormatted + ' ' + date;

    const processTransaction = () => {
        // alert("ATeM: Transaction processed");
        // console.log(username, amount, recipient, message, payType, makePublic);
        // console.log("ATeM: Transaction processed");

        const body = {
            usernameA: username,
            usernameB: recipient,
            transactionType: payType,
            amount: amount,
            description: message,
            timeStamp: timeDate,
            isPublic: makePublic
        };

        const setting = {
            method: 'post',
            body: JSON.stringify(body),
        };

        fetch('/api/send-transaction', setting) //built in
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setResult(data);
            })
            .catch(console.log); // async try/catch

    };

    if (result !== null && result.isSuccess) {
        return (
            <div>
                {/* <FlashMessage duration={5000}>
                        <div id="success-msg">
                            <p>Transaction processed!</p>
                        </div>
                    </FlashMessage> */}
                <Redirect to='/dashboard' /></div>
        );

    } 
    // else {
    //     alert("Transaction failed");
    // }

    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="make-transaction-page-container">
                <div className="content-container">
                    <div className="form-container">
                        <h1>Make a Transaction</h1>
                        <TextFieldInput type="text" value={recipient} onChange={e => setRecipient(e.target.value)} name="recipient">Recipient</TextFieldInput>
                        <TextFieldInput type="number" step="0.01" min="0" value={amount} onChange={e => setAmount(e.target.value)} name="amount">Amount</TextFieldInput>
                        <TextFieldInput type="text" value={message} onChange={e => setMessage(e.target.value)} name="message" textarea>Message/Memo</TextFieldInput>
                        <div className="payment-type-radios">
                            <label>
                                <input type="radio" value="Pay" name="payment type" onChange={e => setPayType(e.target.value)} />
                                <span id="send-radio">Send</span>
                            </label>
                            <label>
                                <input type="radio" value="Request" name="payment type" onChange={e => setPayType(e.target.value)} />
                                <span id="request-radio">Request</span>
                            </label>
                        </div>
                        <CheckboxInput onClick={e => setPublic(e.target.checked)}>Display this transaction publicly in the feed.</CheckboxInput>
                        <Button buttonstyle="primary" onClick={processTransaction} to="#"><FiArrowRightCircle />Process Transaction</Button>
                        {(result !== null && !result.isSuccess) && <div id="server-error-msg" className="error-msg">{result.message}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}





