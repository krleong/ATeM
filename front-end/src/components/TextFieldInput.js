import React from 'react';
import { useState } from 'react';
import './TextFieldInput.css';

function TextFieldInput(props) {
    const [value, setValue] = useState('');

    function valueChanged(e) {
        setValue(e.target.value);
    }

    return (
        <div className="textfield-container">
            <div id={props.id} className="error-msg"></div>
            <div className="textfield-input-container">
                {props.textarea ?
                    <textarea className="textfield-input" value={props.value} type={props.type} name={props.name} onChange={valueChanged, props.onChange} step={props.step}></textarea>
                    :
                    <input className="textfield-input" value={props.value} type={props.type} name={props.name} onChange={valueChanged, props.onChange} step={props.step}></input>
                }
                <label className={props.value ? 'textfield-label filled' : 'textfield-label'} htmlFor={props.name}>{props.children}</label>
            </div>
        </div>
    );
}

export default TextFieldInput;