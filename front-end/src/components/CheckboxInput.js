import React from 'react';
import './CheckboxInput.css';
import {FiCheck} from 'react-icons/fi';

export default function CheckboxInput(props) {
    return (
        <div className="checkbox-container">
            <label className="checkbox-label">
                <input onClick={props.onClick} type="checkbox" className="checkbox-input" />
                <span className="checkbox-rendered"><FiCheck /></span>
                <p className="checkbox-text">{props.children}</p>
            </label>
        </div>
    );

}

