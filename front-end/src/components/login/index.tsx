import React from 'react'
import { Link } from 'react-router-dom';

import './login.css'

export class Login extends React.Component<{},{}> {
  
  render() {
    return <div className="login-wrapper">
        <div className="login">
            <form>
                <div>
                    <div className="email">
                        <label htmlFor="#emailInput" >email</label>
                        <input type="text" placeholder="helloworld@example.com" id="emailInput" />
                    </div>
                    <div className="password"> 
                        <label htmlFor="#passwordInput">password</label>
                        <input type="password" placeholder="***********" id="passwordInput" />
                    </div>
                    <div className="button">
                        <button type="submit">Login</button>
                    </div>
                    <div className="to-register">
                        관리자가 아니신가요? 함께하기 -&gt; <Link to="/register">register</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    ;
  }
}