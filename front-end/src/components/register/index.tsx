import React from 'react'
import { Link } from 'react-router-dom';

import './register.css'

export class Register extends React.Component<{},{}> {
  
  render() {
    return <div className="register-wrapper">
        <div className="register">
            <form>
                <div>
                    <div className="username">
                        <label htmlFor="#usernameInput" >username</label>
                        <input type="text" placeholder="username" id="usernameInput" />
                    </div>
                    <div className="email">
                        <label htmlFor="#emailInput" >email</label>
                        <input type="text" placeholder="helloworld@example.com" id="emailInput" />
                    </div>
                    <div className="password"> 
                        <label htmlFor="#passwordInput">password</label>
                        <input type="password" placeholder="***********" id="passwordInput" />
                    </div>
                    <div className="password-confirm"> 
                        <label htmlFor="#passwordConfirmInput">password confirm</label>
                        <input type="password-confirm" placeholder="***********" id="passwordConfirmInput" />
                    </div>
                    <div className="secret-code"> 
                        <label htmlFor="#secretCodeInput">secretCode</label>
                        <input type="text" placeholder="***********" id="secretCodeInput" />
                        <p>
                            허가된 사용자만 관리자가 될 수 있습니다. <br />
                            email : dev.tmdqh@gmail.com 혹은 <br />
                            kakaotalk id : dev.secretjuju 로 연락주시길 바랍니다.
                        </p>
                    </div>
                    
                    <div className="button">
                        <button type="submit">Register</button>
                        
                    </div>
                    <div className="at-regiter-to-login">
                        <Link to="/login">login으로</Link>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    ;
  }
}