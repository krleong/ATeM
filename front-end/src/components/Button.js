import React from 'react';
import {Link} from 'react-router-dom';

import './Button.css';

export default function Button(props) {
    return (
      <div className="button-container">
      {props.buttonstyle === "primary" ?
        <Link {...props} className="primary-button"><div>{props.children}</div></Link>
        :
        <Link {...props} className="secondary-button"><div>{props.children}</div></Link>
      }
      </div>
        );
        
  }